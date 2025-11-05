import Parser, { type ParserOptions } from '@apidevtools/json-schema-ref-parser'
import { JSONSchema } from './types/JSONSchema'
import { log } from './utils'

export interface RawRefResolver {
  get: (key: JSONSchema) => string | undefined
}

export async function dereference(
  schema: JSONSchema,
  cwd: string,
  options: ParserOptions
): Promise<{ dereferencedPaths: RawRefResolver; dereferencedSchema: JSONSchema }> {
  log('dereferencer', 'Dereferencing input schema:', cwd, schema)

  // normalize options
  if (!cwd.endsWith('/')) {
    cwd += '/'
  }

  const schemaToRefs = new WeakMap<JSONSchema, string>()
  const dereferencedSchema = await Parser.dereference<JSONSchema>(cwd, schema, {
    ...options,
    mutateInputSchema: false,
    dereference: {
      ...options.dereference,
      onDereference($ref: string, schema: JSONSchema) {
        schemaToRefs.set(schema, $ref)
      }
    }
  })
  return { dereferencedSchema, dereferencedPaths: schemaToRefs }
}
