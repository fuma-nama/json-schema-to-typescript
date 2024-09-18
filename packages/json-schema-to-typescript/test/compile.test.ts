import { expect, test } from 'vitest'
import { compile, compileJsonFile, compileYamlFile } from '../src'
import path from 'path'
import { fileURLToPath } from 'url'
import { readFile } from 'fs/promises'
import Parser from '@apidevtools/json-schema-ref-parser'
import type { JSONSchema4 } from 'json-schema'

const dir = path.dirname(fileURLToPath(import.meta.url))

test('compile: JSON', async () => {
  const file = await readFile(path.join(dir, './resources/other/ReferencingType.json'))

  expect(
    await compileJsonFile(file, 'ReferencingType', {
      cwd: path.join(dir, './resources')
    })
  ).toMatchFileSnapshot('./snapshots/compile-from-file.ts')
})

test('compile: JSON, dereferenced', async () => {
  const cwd = path.join(dir, './resources')
  const dereferenced = await Parser.dereference<JSONSchema4>(path.join(dir, './resources/Person.json'), {
    mutateInputSchema: true,
  })

  const res = await compile(dereferenced, 'Person', {
    cwd,
    $refOptions: false
  })

  expect(res).toMatchFileSnapshot('./snapshots/compile-dereferenced.ts')
})

test('compile: Yaml', async () => {
  const file = await readFile(path.join(dir, './resources/other/ReferencingType.yml'))

  expect(
    await compileYamlFile(file, 'ReferencingType', {
      cwd: path.join(dir, './resources')
    })
  ).toMatchFileSnapshot('./snapshots/compile-from-file-yaml.ts')
})
