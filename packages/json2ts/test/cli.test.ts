import { expect, test } from 'vitest'
import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'node:path'

const testDir = path.dirname(fileURLToPath(import.meta.url))
const cwd = path.join(testDir, '../')

test('pipe in, pipe out', () => {
  const file = readFileSync(path.join(testDir, './resources/ReferencedType.json')).toString()

  expect(execSync(`node dist/cli.js`, { encoding: 'utf-8', input: file, cwd }).toString()).toMatchFileSnapshot(
    './snapshots/cli-pipe-in.ts'
  )
})

test('pipe in, pipe out: schema without ID', () => {
  const file = readFileSync(path.join(testDir, './resources/ReferencedTypeWithoutID.json')).toString()

  expect(execSync('node dist/cli.js', { encoding: 'utf-8', input: file, cwd }).toString()).toMatchFileSnapshot(
    './snapshots/cli-pipe-in-without-id.ts'
  )
})

test('file in, pipe out: no flags', () => {
  expect(
    execSync(`node dist/cli.js ./test/resources/ReferencedType.json`, {
      cwd
    }).toString()
  ).toMatchFileSnapshot('./snapshots/cli-file-in.ts')
})

test('file in, pipe out: --input', () => {
  expect(
    execSync(`node dist/cli.js --input ./test/resources/ReferencedType.json`, {
      cwd
    }).toString()
  ).toMatchFileSnapshot('./snapshots/cli-file-in-flags.ts')

  expect(
    execSync(`node dist/cli.js -i ./test/resources/ReferencedType.json`, {
      cwd
    }).toString()
  ).toMatchFileSnapshot('./snapshots/cli-file-in-flags-shortcut.ts')
})

test('file in (-i), unreachable definitions flag, pipe out', () => {
  expect(
    execSync('node dist/cli.js -i ./test/resources/DefinitionsOnly.json --unreachableDefinitions', {
      cwd
    }).toString()
  ).toMatchFileSnapshot('./snapshots/cli-file-unreachable-definitions.ts')
})

test('file in (-i), style flags, pipe out', () => {
  expect(
    execSync('node dist/cli.js -i ./test/resources/Enum.json --style.singleQuote --no-style.semi', {
      cwd
    }).toString()
  ).toMatchFileSnapshot('./snapshots/cli-file-style-flags.ts')
})
