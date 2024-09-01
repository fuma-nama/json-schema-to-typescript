import { expect, test } from 'vitest'
import { compileFromFile } from '../src'
import path from 'path'
import { fileURLToPath } from 'url'

const dir = path.dirname(fileURLToPath(import.meta.url))

test('compileFromFile should resolve refs from cwd option', async () => {
  expect(
    await compileFromFile(path.join(dir, './resources/other/ReferencingType.json'), {
      cwd: path.join(dir, './resources')
    })
  ).toMatchFileSnapshot('./snapshots/compile-from-file.ts')
})

test('compileFromFile should resolve refs from cwd option as yml', async () => {
  expect(
    await compileFromFile(path.join(dir, './resources/other/ReferencingType.yml'), {
      cwd: path.join(dir, './resources')
    })
  ).toMatchFileSnapshot('./snapshots/compile-from-file-yaml.ts')
})
