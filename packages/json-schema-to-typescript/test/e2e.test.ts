import type { FileInfo } from '@apidevtools/json-schema-ref-parser'
import { expect, test } from 'vitest'
import { readdirSync } from 'fs'
import { compile, JSONSchema, Options } from '../src'
import { log, deepMerge } from '../src/utils'
import { getWithCache } from './http'
import path from 'path'
import { fileURLToPath } from 'url'

const cwd = path.join(path.dirname(fileURLToPath(import.meta.url)), '../')
const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), './e2e')

type TestCase = {
  input: JSONSchema
  error?: true
  exclude?: boolean
  only?: boolean
  options?: Options
}

const httpWithCacheResolver = {
  order: 1,
  canRead: /^https?:/i,
  async read({ url }: FileInfo) {
    return await getWithCache(url)
  }
}

/**
 * Avoid appending "js" to top-level unnamed schemas
 */
function stripExtension(filename: string): string {
  return filename.replace(path.extname(filename), '')
}

function runOne(exports: TestCase, name: string) {
  log('Running test', name)

  const options = deepMerge<Options>(
    { cwd },
    { $refOptions: { resolve: { http: httpWithCacheResolver } } },
    exports.options
  )

  test(name, async () => {
    if (exports.error) {
      await expect(compile(exports.input, stripExtension(name), options)).rejects.toThrowError()
    } else {
      expect(await compile(exports.input, stripExtension(name), options)).toMatchFileSnapshot(`./snapshots/e2e/${name}`)
    }
  })
}

const modules = await Promise.all(
  readdirSync(dir)
    .filter(item => !item.includes('.ignore.') && /^.*\.ts$/.test(item))
    .map(async item => [item, await import(`./e2e/${item}`)])
)

modules.filter(mod => !mod[1].exclude).forEach(mod => runOne(mod[1], mod[0]))
