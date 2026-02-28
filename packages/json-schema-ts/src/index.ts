import { JSONSchema } from 'json-schema-typed/draft-2020-12'
import { AST_NODE_TYPES as Types, TSESTree as AST } from '@typescript-eslint/types'
import { print, Visitors } from 'esrap'
import ts, { Comment } from 'esrap/languages/ts'
import { createPendingFactory, PendingFactory } from './pending'
import { isValidPropertyName, toSafeString } from './utils'

interface Context extends PendingFactory, Pick<CompileOptions, 'shouldSeparateDeclaration' | 'getSchemaId'> {
  declarations: Map<
    string,
    {
      schema: JSONSchema
      typeAnnotation: AST.TypeNode
    }
  >
  getSchemaId: (schema: object) => string | undefined
  inlineResults: WeakMap<Exclude<JSONSchema, boolean>, AST.TypeNode>

  getSchemaDeclaration: (schema: Exclude<JSONSchema, boolean>) => string | undefined

  comments: Map<AST.Node, Comment[]>
  addComment: (node: AST.Node, ...comments: Comment[]) => void
  transferComment: (from: AST.Node, to: AST.Node) => void
}

function context(options: CompileOptions): Context {
  return {
    ...createPendingFactory(),
    ...options,
    declarations: new Map(),
    inlineResults: new Map(),
    comments: new Map(),
    getSchemaId(schema) {
      return options.getSchemaId?.(schema)
    },
    getSchemaDeclaration(schema) {
      for (const [k, v] of this.declarations) {
        if (v.schema === schema) return k
      }
    },
    addComment(node, ...comments) {
      const list = this.comments.get(node)

      if (!list) {
        this.comments.set(node, comments)
      } else {
        list.push(...comments)
      }
    },
    transferComment(from, to) {
      const a = this.comments.get(from)

      if (a) {
        this.addComment(to, ...a)
        this.comments.delete(from)
      }
    }
  }
}

export interface CompileOptions {
  name?: string
  /**
   * assuming the input schema is already dereferenced, this function should return the original `$ref` value.
   */
  getSchemaId?: (schema: object) => string | undefined
  /**
   * whether the schema should be generated separatedly as another type, or prefer inline if possible.
   */
  shouldSeparateDeclaration?: (schema: object) => boolean
  unreachableDefinitions?: boolean
}

function compileAst(schema: JSONSchema, options: CompileOptions = {}) {
  const ctx = context(options)
  registerDeclaration(options.name ?? 'NoName', schema, ctx, inline(schema, ctx))

  if (typeof schema === 'object' && options.unreachableDefinitions && 'definitions' in schema && schema.definitions) {
    for (const [k, v] of Object.entries(schema.definitions)) {
      if (typeof v === 'object' && ctx.getSchemaDeclaration(v)) continue
      registerDeclaration(k, v, ctx, inline(v, ctx))
    }
  }

  const body: AST.ProgramStatement[] = []
  for (const [name, { schema, typeAnnotation }] of ctx.declarations) {
    const node = {
      type: Types.ExportNamedDeclaration,
      declaration: createDeclaration(name, schema, typeAnnotation),
      exportKind: 'type'
    } as AST.ExportNamedDeclaration
    ctx.transferComment(typeAnnotation, node)
    body.push(node)
  }

  const program = {
    type: Types.Program,
    body,
    sourceType: 'module'
  } as AST.Program
  return { program, ctx }
}

export function compile(schema: JSONSchema, options: CompileOptions = {}): string {
  const { program, ctx } = compileAst(schema, options)

  const visitor = ts({
    getLeadingComments(node) {
      return ctx.comments.get(node as never)?.map(formatComment)
    }
  })
  Object.assign(visitor, {
    'use-raw'(node, ctx) {
      if ('raw' in node && typeof node.raw === 'string') ctx.write(node.raw)
    }
  } as Visitors)
  return print(program, visitor).code
}

function formatComment(c: Comment) {
  if (c.type === 'Block') {
    const lines = c.value
      .trim()
      .split('\n')
      .map(v => `* ${v}`)
    return {
      ...c,
      value: `*\n${lines.join('\n')}\n`
    }
  }

  return c
}

type DistributiveOmit<T, K extends PropertyKey> = T extends any ? Omit<T, K> : never

type NoBase<T> = DistributiveOmit<T, 'range' | 'loc' | 'parent'>

function base<T>(t: NoBase<T>): T {
  return t as T
}

function registerDeclaration(
  preferredName: string | undefined | null,
  schema: JSONSchema,
  ctx: Context,
  typeAnnotation: AST.TypeNode
): string {
  if (typeof schema !== 'boolean') {
    preferredName ??= schema.title ?? schema.$id ?? ctx.getSchemaId(schema)
  }

  let name = toSafeString(preferredName ?? 'NoName')
  const originalName = name
  for (let i = 1; ctx.declarations.has(name); i++) {
    name = `${originalName}${i}`
  }

  ctx.declarations.set(name, { schema, typeAnnotation })
  return name
}

function createDeclaration(name: string, _schema: JSONSchema, typeAnnotation: AST.TypeNode): AST.Node {
  if (typeAnnotation.type === Types.TSTypeLiteral) {
    return base({
      type: Types.TSInterfaceDeclaration,
      declare: false,
      extends: [],
      typeParameters: undefined,
      id: identifier(name),
      body: base({
        type: Types.TSInterfaceBody,
        body: typeAnnotation.members
      })
    })
  } else {
    return {
      type: Types.TSTypeAliasDeclaration,
      id: identifier(name),
      typeAnnotation
    } as AST.TSTypeAliasDeclaration
  }
}

function inline(schema: JSONSchema, ctx: Context, skipCache = false): AST.TypeNode {
  if (typeof schema === 'boolean')
    return schema ? base({ type: Types.TSAnyKeyword }) : base({ type: Types.TSNeverKeyword })

  if (!skipCache) {
    const createdDeclaration = ctx.getSchemaDeclaration(schema)
    if (createdDeclaration) {
      return {
        type: Types.TSTypeReference,
        typeName: identifier(createdDeclaration)
      } as AST.TSTypeReference
    }

    const cached = ctx.inlineResults.get(schema)

    // recursive (parent -> child -> parent)
    if (cached !== undefined && ctx.isPending(cached)) {
      const createdId = registerDeclaration(null, schema, ctx, cached)

      return {
        type: Types.TSTypeReference,
        typeName: identifier(createdId)
      } as AST.TSTypeReference
    }

    if (cached !== undefined) {
      return cached
    }

    const shouldSeparateDeclaration = ctx.shouldSeparateDeclaration
      ? ctx.shouldSeparateDeclaration(schema)
      : ctx.getSchemaId(schema) !== undefined
    if (shouldSeparateDeclaration) {
      const pending = ctx.createPending<AST.TypeNode>()
      ctx.inlineResults.set(schema, pending)
      const createdId = registerDeclaration(null, schema, ctx, pending)

      ctx.resolvePending(pending, inline(schema, ctx, true))
      inlineComment(pending, schema, ctx)
      return {
        type: Types.TSTypeReference,
        typeName: identifier(createdId)
      } as AST.TSTypeReference
    } else {
      const pending = ctx.createPending<AST.TypeNode>()
      ctx.inlineResults.set(schema, pending)
      ctx.resolvePending(pending, inline(schema, ctx, true))
      inlineComment(pending, schema, ctx)
      return pending
    }
  }

  if ('tsType' in schema && typeof schema.tsType === 'string') {
    return { type: 'use-raw', raw: schema.tsType } as never
  }

  if (schema.not) {
    return base({
      type: Types.TSTypeReference,
      typeName: identifier('Exclude'),
      typeArguments: base({
        type: Types.TSTypeParameterInstantiation,
        params: [base({ type: Types.TSUnknownKeyword }), inline(schema.not, ctx)]
      })
    })
  }

  let union = schema.oneOf ?? schema.anyOf
  if (union) {
    return simplifyUnion({
      type: Types.TSUnionType,
      types: union.map(member => inline(member, ctx))
    })
  }

  if (schema.allOf) {
    const out: AST.TSIntersectionType = base({
      type: Types.TSIntersectionType,
      types: []
    })

    for (const member of schema.allOf) {
      out.types.push(inline(member, ctx))
    }

    return out
  }

  if (schema.enum) {
    const types: AST.TypeNode[] = []

    for (const member of schema.enum) {
      types.push(
        base({
          type: Types.TSLiteralType,
          literal: {
            type: Types.Literal,
            value: member
          } as never
        })
      )
    }

    return simplifyUnion({
      type: Types.TSUnionType,
      types
    })
  }

  if (schema.const) {
    return base({
      type: Types.TSLiteralType,
      literal: {
        type: Types.Literal,
        value: schema.const
      } as never
    })
  }

  if (Array.isArray(schema.type)) {
    return simplifyUnion({
      type: Types.TSUnionType,
      types: schema.type.map(v => inline({ ...schema, type: v }, ctx))
    })
  }

  let actualType: JSONSchema.TypeValue | undefined
  // implicit types
  if (schema.type) actualType = schema.type
  else if (schema.properties || schema.additionalProperties || schema.patternProperties) actualType = 'object'
  else if (schema.items) actualType = 'array'

  switch (actualType) {
    case 'null':
      return base({ type: Types.TSNullKeyword })
    case 'boolean':
      return base({ type: Types.TSBooleanKeyword })
    case 'number':
    case 'integer':
      return base({ type: Types.TSNumberKeyword })
    case 'string':
      return base({ type: Types.TSStringKeyword })
    case 'object': {
      let cur: AST.TypeNode[] = []
      if (schema.properties) {
        const required = new Set(schema.required)

        cur.push(
          base({
            type: Types.TSTypeLiteral,
            members: Object.entries(schema.properties).map(([k, v]) => {
              const child = inline(v, ctx)
              const prop = {
                type: Types.TSPropertySignature,
                key: isValidPropertyName(k) ? identifier(k) : stringLiteral(k),
                optional: !required.has(k),
                typeAnnotation: base({
                  type: Types.TSTypeAnnotation,
                  typeAnnotation: child
                })
              } as AST.TSPropertySignature

              ctx.transferComment(child, prop)
              return prop
            })
          })
        )
      }

      const fallbackTypes: AST.TypeNode[] = []

      if (schema.patternProperties) {
        for (const value of Object.values(schema.patternProperties)) fallbackTypes.push(inline(value, ctx))
      }
      if (schema.additionalProperties) {
        fallbackTypes.push(inline(schema.additionalProperties, ctx))
      }

      if (fallbackTypes.length > 0) {
        cur.push(
          base({
            type: Types.TSTypeReference,
            typeName: identifier('Record'),
            typeArguments: base({
              type: Types.TSTypeParameterInstantiation,
              params: [
                base({ type: Types.TSStringKeyword }),
                simplifyUnion({
                  type: Types.TSUnionType,
                  types: fallbackTypes
                })
              ]
            })
          })
        )
      }

      // unknown object
      if (cur.length === 0) return base({ type: Types.TSTypeLiteral, members: [] })
      if (cur.length === 1) return cur[0]
      return base({
        type: Types.TSIntersectionType,
        types: cur
      })
    }
    case 'array': {
      if (Array.isArray(schema.items)) {
        return base({
          type: Types.TSTupleType,
          elementTypes: schema.items.map(item =>
            base({
              type: Types.TSOptionalType,
              typeAnnotation: parenthesizeIfNeeded(inline(item, ctx))
            })
          )
        })
      }

      return base({
        type: Types.TSArrayType,
        elementType: schema.items ? parenthesizeIfNeeded(inline(schema.items, ctx)) : base({ type: Types.TSAnyKeyword })
      })
    }
    case 'any':
      return base({ type: Types.TSAnyKeyword })
  }

  // backward compat
  if ('nullable' in schema && schema.nullable === true) {
    return base({ type: Types.TSNullKeyword })
  }

  // for non-object with `required`, it should add required keys in an intersection with another object
  // notice that `{ a?: string } & { a: unknown } = { a: string }`
  // construct a Record<'a', unknown> can achieve a similiar effect
  if (schema.required) {
    return base({
      type: Types.TSTypeReference,
      typeName: identifier('Record'),
      typeArguments: base({
        type: Types.TSTypeParameterInstantiation,
        params: [
          simplifyUnion({
            type: Types.TSUnionType,
            types: schema.required.map(key =>
              base({
                type: Types.TSLiteralType,
                literal: stringLiteral(key)
              })
            )
          }),
          base({ type: Types.TSUnknownKeyword })
        ]
      })
    })
  }

  return base({ type: Types.TSUnknownKeyword })
}

function inlineComment(node: AST.TypeNode, schema: JSONSchema, ctx: Context) {
  if (typeof schema === 'boolean') return

  if (schema.description) {
    ctx.addComment(node, {
      type: 'Block',
      value: schema.description
    } as Comment)
  }
}

function identifier(key: string) {
  return {
    type: Types.Identifier,
    name: key
  } as AST.Identifier
}

function stringLiteral(value: string): AST.StringLiteral {
  return {
    type: Types.Literal,
    value
  } as AST.StringLiteral
}

function simplifyUnion(t: NoBase<AST.TSUnionType>): AST.TypeNode {
  if (t.types.length === 1) return t.types[0]
  return t as AST.TSUnionType
}

function parenthesizeIfNeeded(node: AST.TypeNode): AST.TypeNode {
  if (node.type === Types.TSUnionType || node.type === Types.TSIntersectionType)
    return {
      type: 'TSParenthesizedType',
      typeAnnotation: node
    } as never
  return node
}
