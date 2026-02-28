import { dereference, type ParserOptions } from '@apidevtools/json-schema-ref-parser'
import { expect, test } from 'vitest'
import { readdirSync } from 'fs'
import { compile, CompileOptions } from '../src'
import path from 'path'
import { fileURLToPath } from 'url'
import { JSONSchema } from 'json-schema-typed/draft-2020-12'
import type { DereferenceOptions } from '@apidevtools/json-schema-ref-parser/dist/lib/options'

const cwd = path.join(path.dirname(fileURLToPath(import.meta.url)), '../')
const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), './e2e')

type TestCase = {
  input: JSONSchema
  error?: true
  exclude?: boolean
  only?: boolean
  options?: CompileOptions
  ref?: false | ParserOptions
}

/**
 * Avoid appending "js" to top-level unnamed schemas
 */
function stripExtension(filename: string): string {
  return filename.replace(path.extname(filename), '')
}

function runOne(exports: TestCase, name: string) {
  test(name, async () => {
    const idToSchema = new WeakMap<object, string>()
    let input = exports.input
    if (exports.ref !== false) {
      input = await dereference(path.join(cwd, name), exports.input, {
        mutateInputSchema: false,
        dereference: {
          onDereference(path, value) {
            idToSchema.set(value, path)
          }
        } satisfies DereferenceOptions
      })
    }

    const options: CompileOptions = {
      name: stripExtension(name),
      getSchemaId(schema) {
        return idToSchema.get(schema)
      },
      ...exports.options
    }

    if (exports.error) {
      await expect(() => compile(input, options)).toThrowError()
    } else {
      await expect(compile(input, options)).toMatchFileSnapshot(`./snapshots/e2e/${name}`)
    }
  })
}

const modules = await Promise.all(
  readdirSync(dir)
    .filter(item => !item.includes('.ignore.') && /^.*\.ts$/.test(item))
    .map(async item => [item, await import(`./e2e/${item}`)])
)

for (const mod of modules) {
  if (mod[1].exclude) continue

  runOne(mod[1], mod[0])
}
