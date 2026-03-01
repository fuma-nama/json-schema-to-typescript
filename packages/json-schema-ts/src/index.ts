import { JSONSchema } from 'json-schema-typed/draft-2020-12'
import { AST_NODE_TYPES as Types, TSESTree as AST } from '@typescript-eslint/types'
import { print, PrintOptions, Visitors } from 'esrap'
import ts, { type Comment } from 'esrap/languages/ts'
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

  /**
   * whether the schema should be included or excluded from output.
   */
  filter: (schema: JSONSchema) => boolean
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
    },
    filter(schema) {
      if (typeof schema === 'boolean') return true
      if (schema.readOnly && !options.readOnly) return false
      if (schema.writeOnly && !options.writeOnly) return false
      return true
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

  readOnly?: boolean
  writeOnly?: boolean

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
      return ctx.comments.get(node as AST.Node)?.map(formatComment)
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
    const child = inline(schema.not, ctx)
    const out: AST.TSTypeReference = base({
      type: Types.TSTypeReference,
      typeName: identifier('Exclude'),
      typeArguments: base({
        type: Types.TSTypeParameterInstantiation,
        params: [base({ type: Types.TSUnknownKeyword }), child]
      })
    })
    ctx.comments.transfer(child, out)
    return out
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
      types: schema.type.map(v => {
        const child = inline({ ...schema, type: v }, ctx)
        ctx.comments.delete(child)
        return child
      })
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
        const members: AST.TypeElement[] = []

        for (const [k, v] of Object.entries(schema.properties)) {
          if (!ctx.filter(v)) continue

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
          members.push(prop)
        }

        cur.push(base({ type: Types.TSTypeLiteral, members }))
      }

      const fallbackTypes: AST.TypeNode[] = []

      if (schema.patternProperties) {
        for (const value of Object.values(schema.patternProperties)) {
          if (ctx.filter(value)) fallbackTypes.push(inline(value, ctx))
        }
      }

      if (schema.additionalProperties && ctx.filter(schema.additionalProperties)) {
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

      // empty object
      if (cur.length === 0) return base({ type: Types.TSTypeLiteral, members: [] })

      return simplyIntersection({
        type: Types.TSIntersectionType,
        types: cur
      })
    }
    case 'array': {
      let tupleItems: JSONSchema[] | undefined
      let tupleRest: JSONSchema | undefined

      if (Array.isArray(schema.prefixItems)) {
        tupleItems = schema.prefixItems
        tupleRest = schema.items
      } else if (Array.isArray(schema.items)) {
        // backward compat
        tupleItems = schema.items
        tupleRest = schema.additionalItems
      }

      if (tupleItems !== undefined) {
        const elementTypes: AST.TypeNode[] = tupleItems.map(item =>
          base({
            type: Types.TSOptionalType,
            typeAnnotation: parenthesizeIfNeeded(inline(item, ctx))
          })
        )

        if (tupleRest !== undefined) {
          elementTypes.push(
            base({
              type: Types.TSRestType,
              typeAnnotation: base({
                type: Types.TSArrayType,
                elementType: parenthesizeIfNeeded(inline(tupleRest, ctx))
              })
            })
          )
        }

        return base({ type: Types.TSTupleType, elementTypes })
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

type CommentTagHandler = (key: string, value: unknown) => string | undefined
const commentHandlers = {
  raw(k, v) {
    let content: string
    if (typeof v === 'string') {
      content = v
    } else {
      content = JSON.stringify(v, null, 2)
    }

    if (content.includes('\n')) {
      return `@${k}\n\`\`\`\n${escapeJSDocContent(content)}\n\`\`\``
    } else {
      return `@${k} \`${escapeJSDocContent(content, true)}\``
    }
  },
  trigger(key, value) {
    if (value === true) return `@${key}`
  }
} satisfies Record<string, CommentTagHandler>

const CommentTags: Partial<Record<keyof Exclude<JSONSchema, boolean>, CommentTagHandler>> = {
  minItems: commentHandlers.raw,
  maxItems: commentHandlers.raw,
  contains: commentHandlers.raw,
  uniqueItems: commentHandlers.trigger,
  pattern: commentHandlers.raw,
  multipleOf: commentHandlers.raw,
  default: commentHandlers.raw,
  minProperties: commentHandlers.raw,
  minLength: commentHandlers.raw,
  minimum: commentHandlers.raw,
  maximum: commentHandlers.raw,
  exclusiveMaximum: commentHandlers.raw,
  exclusiveMinimum: commentHandlers.raw,
  deprecated: commentHandlers.trigger,
  minContains: commentHandlers.raw,
  maxContains: commentHandlers.raw,
  maxLength: commentHandlers.raw,
  maxProperties: commentHandlers.raw,
  format: commentHandlers.raw,
  examples(_, value) {
    if (!Array.isArray(value)) return

    return value.map(item => commentHandlers.raw('example', item)).join('\n')
  }
}

function inlineComment(node: AST.TypeNode, schema: JSONSchema, ctx: Context) {
  if (typeof schema === 'boolean') return
  const concat: string[] = []
  if (schema.description) concat.push(escapeJSDocContent(schema.description))

  for (const k in schema) {
    const handler = CommentTags[k as keyof typeof CommentTags]
    if (!handler) continue
    const result = handler(k, schema[k as never])
    if (result !== undefined) concat.push(result)
  }

  if (concat.length === 0) return
  ctx.comments.add(node, {
    type: 'Block',
    value: concat.join('\n')
  } as Comment)
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
