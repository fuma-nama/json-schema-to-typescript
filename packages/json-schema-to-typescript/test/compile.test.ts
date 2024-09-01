import { expect, test } from 'vitest'
import { compileJsonFile, compileYamlFile } from '../src'
import path from 'path'
import { fileURLToPath } from 'url'
import { readFile } from 'fs/promises'

const dir = path.dirname(fileURLToPath(import.meta.url))

test('compile: JSON', async () => {
  const file = await readFile(path.join(dir, './resources/other/ReferencingType.json'))

  expect(
    await compileJsonFile(file, 'ReferencingType', {
      cwd: path.join(dir, './resources')
    })
  ).toMatchFileSnapshot('./snapshots/compile-from-file.ts')
})

test('compile: Yaml', async () => {
  const file = await readFile(path.join(dir, './resources/other/ReferencingType.yml'))

  expect(
    await compileYamlFile(file, 'ReferencingType', {
      cwd: path.join(dir, './resources')
    })
  ).toMatchFileSnapshot('./snapshots/compile-from-file-yaml.ts')
})
