import { JSONSchema } from 'json-schema-typed/draft-2020-12'
import { AST_NODE_TYPES as Types, TSESTree as AST } from '@typescript-eslint/types'
import { print, Visitors } from 'esrap'
import ts, { Comment } from 'esrap/languages/ts'
import { createPendingFactory, PendingFactory } from './pending'
import { isValidPropertyName, toSafeString } from './utils'

export interface Context extends PendingFactory {
  options: CompileOptions
  declarations: Map<
    string,
    {
      node: AST.TSTypeAliasDeclaration | AST.TSInterfaceDeclaration
      schema: JSONSchema
    }
  >
  getSchemaId: (schema: object) => string | undefined
  inlineResults: WeakMap<Exclude<JSONSchema, boolean>, AST.TypeNode>

  comments: Map<AST.Node, Comment[]>
  addComment: (node: AST.Node, ...comments: Comment[]) => void
  transferComment: (from: AST.Node, to: AST.Node) => void
}

function context(options: CompileOptions): Context {
  return {
    ...createPendingFactory(),
    options,
    declarations: new Map(),
    inlineResults: new Map(),
    comments: new Map(),
    getSchemaId(schema) {
      return options.getSchemaId?.(schema)
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
  getSchemaId?: (schema: object) => string | undefined
  unreachableDefinitions?: boolean
}

export function compile(schema: JSONSchema, options: CompileOptions = {}): string {
  const ctx = context(options)
  declaration(options.name ?? 'NoName', schema, ctx)

  if (typeof schema === 'object' && options.unreachableDefinitions && 'definitions' in schema && schema.definitions) {
    for (const [k, v] of Object.entries(schema.definitions)) {
      declaration(k, v, ctx)
    }
  }

  const body: AST.ProgramStatement[] = []
  for (const def of ctx.declarations.values()) {
    const node = {
      type: Types.ExportNamedDeclaration,
      declaration: def.node,
      exportKind: 'type'
    } as AST.ExportNamedDeclaration
    ctx.transferComment(def.node, node)
    body.push(node)
  }

  const program = {
    type: Types.Program,
    body,
    sourceType: 'module'
  } as AST.Program

  const visitor = ts({
    getLeadingComments(node) {
      return ctx.comments.get(node as never)
    }
  })
  Object.assign(visitor, {
    'use-raw'(node, ctx) {
      if ('raw' in node && typeof node.raw === 'string') ctx.write(node.raw)
    }
  } as Visitors)
  return print(program, visitor).code
}

type DistributiveOmit<T, K extends PropertyKey> = T extends any ? Omit<T, K> : never

type NoBase<T> = DistributiveOmit<T, 'range' | 'loc' | 'parent'>

function base<T>(t: NoBase<T>): T {
  return t as T
}

function declaration(
  preferredName: string | undefined | null,
  schema: JSONSchema,
  ctx: Context,
  typeAnnotation?: AST.TypeNode
): {
  createdName: string
} {
  if (typeof schema !== 'boolean') {
    for (const [k, v] of ctx.declarations) {
      if (v.schema === schema) return { createdName: k }
    }

    preferredName ??= schema.title ?? schema.$id ?? ctx.getSchemaId(schema)
  }

  let name = toSafeString(preferredName ?? 'NoName')
  const originalName = name
  for (let i = 1; ctx.declarations.has(name); i++) {
    name = `${originalName}${i}`
  }

  const node = {
    type: Types.TSTypeAliasDeclaration,
    id: identifier(name),
    typeAnnotation
  } as AST.TSTypeAliasDeclaration

  ctx.declarations.set(name, {
    node,
    schema
  })

  node.typeAnnotation ??= inline(schema, ctx)
  ctx.transferComment(node.typeAnnotation, node)
  return { createdName: name }
}

function inline(schema: JSONSchema, ctx: Context, skipCache = false): AST.TypeNode {
  if (typeof schema === 'boolean')
    return schema ? base({ type: Types.TSAnyKeyword }) : base({ type: Types.TSNeverKeyword })

  if (!skipCache) {
    const cached = ctx.inlineResults.get(schema)

    // recursive (parent -> child -> parent)
    if (cached !== undefined && ctx.isPending(cached)) {
      const { createdName } = declaration(null, schema, ctx, cached)

      return {
        type: Types.TSTypeReference,
        typeName: identifier(createdName)
      } as AST.TSTypeReference
    }

    // referenced twice: separate declaration instead
    if (cached !== undefined) {
      const { createdName } = declaration(null, schema, ctx, { ...cached })

      ctx.setPending(cached, {
        type: Types.TSTypeReference,
        typeName: identifier(createdName)
      } as AST.TSTypeReference)
      return cached
    }

    const pending = ctx.createPending<AST.TypeNode>()
    ctx.inlineResults.set(schema, pending)
    ctx.setPending(pending, inline(schema, ctx, true))
    ctx.unmarkPending(pending)

    inlineComment(pending, schema, ctx)
    return pending
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
          elementTypes: schema.items.map(item => {
            let child = inline(item, ctx)
            if (child.type === Types.TSUnionType)
              child = {
                type: 'TSParenthesizedType',
                typeAnnotation: child
              } as never

            return base({
              type: Types.TSOptionalType,
              typeAnnotation: child
            })
          })
        })
      }

      return base({
        type: Types.TSArrayType,
        elementType: schema.items ? inline(schema.items, ctx) : base({ type: Types.TSAnyKeyword })
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
