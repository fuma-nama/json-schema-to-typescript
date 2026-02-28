import { expect, test } from 'vitest'
import { compile } from '../src'
import path from 'path'
import { fileURLToPath } from 'url'
import Parser from '@apidevtools/json-schema-ref-parser'
import { JSONSchema } from 'json-schema-typed/draft-2020-12'

const dir = path.dirname(fileURLToPath(import.meta.url))

test.only('compile: JSON, dereferenced', async () => {
  const dereferenced = await Parser.dereference<Exclude<JSONSchema, boolean>>(
    path.join(dir, './resources/Person.json'),
    {
      mutateInputSchema: true
    }
  )

  const res = compile(dereferenced, {
    name: 'Person'
  })

  await expect(res).toMatchFileSnapshot('./snapshots/compile-dereferenced.ts')
})
