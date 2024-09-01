import {expect, test} from 'vitest'
import {compileFromFile} from '../src'

test('compileFromFile should resolve refs from cwd option', async () => {
  expect(
    await compileFromFile('./test/resources/other/ReferencingType.json', {cwd: './test/resources'}),
  ).toMatchFileSnapshot('./snapshots/compile-from-file')
})

test('compileFromFile should resolve refs from cwd option as yml', async () => {
  expect(
    await compileFromFile('./test/resources/other/ReferencingType.yml', {cwd: './test/resources'}),
  ).toMatchFileSnapshot('./snapshots/compile-from-file-yaml')
})
