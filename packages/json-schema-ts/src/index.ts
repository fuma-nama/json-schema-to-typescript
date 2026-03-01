import { JSONSchema } from 'json-schema-typed/draft-2020-12'
import { AST_NODE_TYPES as Types, TSESTree as AST } from '@typescript-eslint/types'
import { print, PrintOptions, Visitors } from 'esrap'
import ts, { Comment } from 'esrap/languages/ts'
import { createPendingFactory, PendingFactory } from './pending'
import { isValidPropertyName, toSafeString } from './utils'
import { CommentFactory, createCommentFactory, escapeJSDocContent, formatComment } from './comments'

interface Context extends Pick<Required<CompileOptions>, 'shouldSeparateDeclaration' | 'getSchemaId'> {
  declarations: Map<
    string,
    {
      schema: JSONSchema
      typeAnnotation: AST.TypeNode
    }
  >
  inlineResults: WeakMap<Exclude<JSONSchema, boolean>, AST.TypeNode>
  getSchemaDeclaration: (schema: Exclude<JSONSchema, boolean>) => string | undefined

  comments: CommentFactory
  pendings: PendingFactory
}

function context(options: CompileOptions): Context {
  return {
    shouldSeparateDeclaration(schema) {
      return options.getSchemaId?.(schema) !== undefined
    },
    declarations: new Map(),
    inlineResults: new Map(),
    comments: createCommentFactory(),
    pendings: createPendingFactory(),
    getSchemaId(schema) {
      return options.getSchemaId?.(schema)
    },
    getSchemaDeclaration(schema) {
      for (const [k, v] of this.declarations) {
        if (v.schema === schema) return k
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

  print?: PrintOptions
  printTypeScript?: NonNullable<Parameters<typeof ts>[0]>
}

function compileAst(root: JSONSchema, options: CompileOptions = {}) {
  const ctx = context(options)
  const targets: [name: string | null, schema: JSONSchema][] = []

  targets.push([options.name ?? null, root])
  if (typeof root === 'object' && options.unreachableDefinitions && 'definitions' in root && root.definitions) {
    targets.push(...Object.entries(root.definitions))
  }

  for (const [name, schema] of targets) {
    if (typeof schema === 'object' && ctx.getSchemaDeclaration(schema)) continue
    const pending = ctx.pendings.create<AST.TypeNode>()
    registerDeclaration(name, schema, ctx, pending)
    const out = inline(schema, ctx, State.DeclarationRoot)
    ctx.pendings.resolve(pending, out)
    ctx.comments.transfer(out, pending)
  }

  const body: AST.ProgramStatement[] = []
  for (const [name, { schema, typeAnnotation }] of ctx.declarations) {
    const node = {
      type: Types.ExportNamedDeclaration,
      declaration: createDeclaration(name, schema, typeAnnotation),
      exportKind: 'type'
    } as AST.ExportNamedDeclaration
    ctx.comments.transfer(typeAnnotation, node)
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
      return ctx.comments.all.get(node as never)?.map(formatComment)
    },
    ...options.printTypeScript
  })
  Object.assign(visitor, {
    'use-raw'(node, ctx) {
      if ('raw' in node && typeof node.raw === 'string') ctx.write(node.raw)
    }
  } as Visitors)
  return print(program, visitor, options.print).code
}

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

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

  let name = toSafeString(preferredName ?? 'Anonymous')
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

enum State {
  DeclarationRoot,
  InlineRoot,
  Body
}

function inline(schema: JSONSchema, ctx: Context, state = State.InlineRoot): AST.TypeNode {
  if (typeof schema === 'boolean')
    return schema ? base({ type: Types.TSAnyKeyword }) : base({ type: Types.TSNeverKeyword })

  if (state === State.InlineRoot) {
    const id = ctx.getSchemaDeclaration(schema)

    // re-use declaration
    if (id) {
      return {
        type: Types.TSTypeReference,
        typeName: identifier(id)
      } as AST.TSTypeReference
    }
  }

  // handle result cache & schema comments
  if (state === State.InlineRoot || state === State.DeclarationRoot) {
    const cached = ctx.inlineResults.get(schema)

    // recursive (parent -> child -> parent): create declaration and return references
    if (cached !== undefined && ctx.pendings.is(cached)) {
      const createdId = registerDeclaration(null, schema, ctx, cached)

      return {
        type: Types.TSTypeReference,
        typeName: identifier(createdId)
      } as AST.TSTypeReference
    }

    if (cached !== undefined) {
      return cached
    }

    if (state !== State.DeclarationRoot && ctx.shouldSeparateDeclaration(schema)) {
      const pending = ctx.pendings.create<AST.TypeNode>()
      const createdId = registerDeclaration(null, schema, ctx, pending)

      ctx.pendings.resolve(pending, inline(schema, ctx, State.DeclarationRoot))
      inlineComment(pending, schema, ctx)
      return {
        type: Types.TSTypeReference,
        typeName: identifier(createdId)
      } as AST.TSTypeReference
    } else {
      const pending = ctx.pendings.create<AST.TypeNode>()
      ctx.inlineResults.set(schema, pending)
      ctx.pendings.resolve(pending, inline(schema, ctx, State.Body))
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

  const union = schema.oneOf ?? schema.anyOf
  if (union) {
    return simplifyUnion({
      type: Types.TSUnionType,
      types: union.map(member => inline(member, ctx))
    })
  }

  if (schema.allOf) {
    return simplyIntersection({
      type: Types.TSIntersectionType,
      types: schema.allOf.map(member => inline(member, ctx))
    })
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
      const cur: AST.TypeNode[] = []
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

              ctx.comments.transfer(child, prop)
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

      return simplyIntersection({
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
    ctx.comments.add(node, {
      type: 'Block',
      value: escapeJSDocContent(schema.description)
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

function simplyIntersection(t: NoBase<AST.TSIntersectionType>): AST.TypeNode {
  if (t.types.length === 1) return t.types[0]
  return t as AST.TSIntersectionType
}

function parenthesizeIfNeeded(node: AST.TypeNode): AST.TypeNode {
  if (node.type === Types.TSUnionType || node.type === Types.TSIntersectionType)
    return {
      type: 'TSParenthesizedType',
      typeAnnotation: node
    } as never
  return node
}
