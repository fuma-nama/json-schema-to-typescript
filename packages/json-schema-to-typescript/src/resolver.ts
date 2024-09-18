import Parser, { type ParserOptions } from '@apidevtools/json-schema-ref-parser'
import { JSONSchema } from './types/JSONSchema'
import { log } from './utils'

export type DereferencedPaths = WeakMap<JSONSchema, string>

export async function dereference(
  schema: JSONSchema,
  cwd: string,
  options: ParserOptions
): Promise<{ dereferencedPaths: DereferencedPaths; dereferencedSchema: JSONSchema }> {
  log('dereferencer', 'Dereferencing input schema:', cwd, schema)
  const dereferencedPaths: DereferencedPaths = new WeakMap()
  const dereferencedSchema = await Parser.dereference<JSONSchema>(cwd, schema, {
    ...options,
    mutateInputSchema: false,
    dereference: {
      ...options.dereference,
      onDereference($ref: string, schema: JSONSchema) {
        dereferencedPaths.set(schema, $ref)
      }
    }
  })
  return { dereferencedPaths, dereferencedSchema }
}
