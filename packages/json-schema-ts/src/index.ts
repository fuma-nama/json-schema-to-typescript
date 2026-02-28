import { JSONSchema } from 'json-schema-typed/draft-2020-12'
import { AST_NODE_TYPES as Types, TSESTree as AST } from '@typescript-eslint/types'
import { print } from 'esrap'
import ts from 'esrap/languages/ts'
import { createPendingFactory, PendingFactory } from './pending'
import { toSafeString } from './utils'

export interface Context extends PendingFactory {
  options: CompileOptions
  declarations: Map<
    string,
    {
      node: AST.TSTypeAliasDeclaration | AST.TSInterfaceDeclaration
      schema: JSONSchema
    }
  >
  getSchemaId: (schema: unknown) => string | undefined
  inlineResults: WeakMap<Exclude<JSONSchema, boolean>, AST.TypeNode>
}

function context(options: CompileOptions): Context {
  return {
    ...createPendingFactory(),
    options,
    declarations: new Map(),
    inlineResults: new Map(),
    getSchemaId(schema) {
      return options.getSchemaId?.(schema)
    }
  }
}

export interface CompileOptions {
  name?: string
  getSchemaId?: (schema: unknown) => string | undefined
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

  const body: Partial<AST.ProgramStatement>[] = []
  for (const def of ctx.declarations.values()) {
    body.push({
      type: Types.ExportNamedDeclaration,
      declaration: def.node,
      exportKind: 'type'
    })
  }

  const program: Partial<AST.Program> = {
    type: Types.Program,
    body: body as AST.ProgramStatement[],
    sourceType: 'module'
  }

  return print(program as never, ts()).code
}

type DistributiveOmit<T, K extends PropertyKey> = T extends any ? Omit<T, K> : never

type NoBase<T> = DistributiveOmit<T, 'range' | 'loc' | 'parent'>

function base<T>(t: NoBase<T>): T {
  return t as T
}

function declaration(
  preferredName: string | null,
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

    preferredName ??= schema.title ?? schema.$id ?? null
  }

  let name = toSafeString(preferredName ?? 'NoName')
  const originalName = name
  for (let i = 1; ctx.declarations.has(name); i++) {
    name = `${originalName}${i}`
  }

  const node = base<AST.TSTypeAliasDeclaration>({
    type: Types.TSTypeAliasDeclaration,
    declare: false,
    id: identifier(name),
    typeAnnotation: typeAnnotation!,
    typeParameters: undefined
  })

  ctx.declarations.set(name, {
    node,
    schema
  })

  node.typeAnnotation ??= inline(schema, ctx)
  return { createdName: name }
}

function inline(schema: JSONSchema, ctx: Context, skipCache = false): AST.TypeNode {
  if (typeof schema === 'boolean')
    return schema ? base({ type: Types.TSAnyKeyword }) : base({ type: Types.TSNeverKeyword })

  if (!skipCache) {
    const cached = ctx.inlineResults.get(schema)

    if (cached !== undefined && ctx.isPending(cached)) {
      const { createdName } = declaration(null, schema, ctx, cached)

      return {
        type: Types.TSTypeReference,
        typeName: identifier(createdName)
      } as AST.TSTypeReference
    }

    if (cached !== undefined) {
      return cached
    }

    const pending = ctx.createPending<AST.TypeNode>()
    ctx.inlineResults.set(schema, pending)
    ctx.setPending(pending, inline(schema, ctx, true))
    ctx.unmarkPending(pending)
    return pending
  }

  if (Array.isArray(schema.type)) {
    return base({
      type: Types.TSUnionType,
      types: schema.type.map(v => inline({ ...schema, type: v }, ctx))
    })
  }

  let union = schema.oneOf ?? schema.anyOf
  if (union) {
    const out: AST.TSUnionType = base({
      type: Types.TSUnionType,
      types: []
    })

    for (const member of union) {
      out.types.push(inline(member, ctx))
    }

    return out
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
    const out: AST.TSUnionType = base({
      type: Types.TSUnionType,
      types: []
    })

    for (const member of schema.enum) {
      out.types.push(
        base({
          type: Types.TSLiteralType,
          literal: {
            type: Types.Literal,
            value: member
          } as never
        })
      )
    }

    return out
  }

  let actualType = schema.type
  if (schema.properties) actualType ??= 'object'

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
      const required = new Set(schema.required)
      if (schema.properties) {
        cur.push(
          base({
            type: Types.TSTypeLiteral,
            members: Object.entries(schema.properties).map(([k, v]) =>
              base({
                type: Types.TSPropertySignature,
                accessibility: undefined,
                computed: false,
                key: identifier(k),
                optional: !required.has(k),
                readonly: false,
                static: false,
                typeAnnotation: base({
                  type: Types.TSTypeAnnotation,
                  typeAnnotation: inline(v, ctx)
                })
              })
            )
          })
        )
      }

      const fallbackProp: AST.TSUnionType = base({
        type: Types.TSUnionType,
        types: []
      })

      if (schema.patternProperties) {
        for (const value of Object.values(schema.patternProperties)) fallbackProp.types.push(inline(value, ctx))
      }
      if (schema.additionalProperties) {
        fallbackProp.types.push(inline(schema.additionalProperties, ctx))
      }

      if (fallbackProp.types.length > 0) {
        cur.push(
          base({
            type: Types.TSTypeReference,
            typeName: identifier('Record'),
            typeArguments: base({
              type: Types.TSTypeParameterInstantiation,
              params: [base({ type: Types.TSStringKeyword }), fallbackProp]
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
              typeAnnotation: inline(item, ctx)
            })
          )
        })
      }

      return base({
        type: Types.TSArrayType,
        elementType: schema.items ? inline(schema.items, ctx) : base({ type: Types.TSAnyKeyword })
      })
    }
  }

  console.log('unsupported', schema)
  return base({ type: Types.TSNeverKeyword })
}

function identifier(key: string) {
  return {
    type: Types.Identifier,
    name: key
  } as AST.Identifier
}
