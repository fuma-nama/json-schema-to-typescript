import type { Plugin } from '..'
import Parser, { type ParserOptions } from '@apidevtools/json-schema-ref-parser'
import { JSONSchema } from '../types/JSONSchema'
import { log } from '../utils'

export interface RefsPluginOptions extends ParserOptions {
  cwd?: string
}

/**
 * A plugin to resolve $refs in input schema.
 *
 * Uses and requires `@apidevtools/json-schema-ref-parser` to be installed in runtime.
 *
 * @param options - [$RefParser](https://github.com/APIDevTools/json-schema-ref-parser) Options, used when resolving `$ref`s
 */
export function refsPlugin(options: RefsPluginOptions = {}): Plugin {
  let { cwd = process.cwd() } = options
  // normalize options
  if (!cwd.endsWith('/')) {
    cwd += '/'
  }

  return {
    async input({ schema, schemaToId }) {
      // skip if configured
      if (schemaToId) return
      log('dereferencer', 'Dereferencing input schema:', cwd, schema)

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

      return { schema: dereferencedSchema, schemaToId: schemaToRefs }
    }
  }
}
