import {expect, test} from 'vitest'
import {execSync} from 'child_process'
import {readFileSync} from 'fs'

test('pipe in, pipe out', () => {
  const file = readFileSync('./test/resources/ReferencedType.json').toString()

  expect(execSync(`node dist/bin/cli.js`, {encoding: 'utf-8', input: file}).toString()).toMatchFileSnapshot(
    './snapshots/cli-pipe-in',
  )
})

test('pipe in, pipe out: schema without ID', () => {
  const file = readFileSync('./test/resources/ReferencedTypeWithoutID.json').toString()

  expect(execSync('node dist/bin/cli.js', {encoding: 'utf-8', input: file}).toString()).toMatchFileSnapshot(
    './snapshots/cli-pipe-in-without-id',
  )
})

test('file in, pipe out: no flags', () => {
  expect(execSync(`node dist/bin/cli.js ./test/resources/ReferencedType.json`).toString()).toMatchFileSnapshot(
    './snapshots/cli-file-in',
  )
})

test('file in, pipe out: --input', () => {
  expect(execSync(`node dist/bin/cli.js --input ./test/resources/ReferencedType.json`).toString()).toMatchFileSnapshot(
    './snapshots/cli-file-in-flags',
  )

  expect(execSync(`node dist/bin/cli.js -i ./test/resources/ReferencedType.json`).toString()).toMatchFileSnapshot(
    './snapshots/cli-file-in-flags-shortcut',
  )
})

test('file in (-i), unreachable definitions flag, pipe out', () => {
  expect(
    execSync('node dist/bin/cli.js -i ./test/resources/DefinitionsOnly.json --unreachableDefinitions').toString(),
  ).toMatchFileSnapshot('./snapshots/cli-file-unreachable-definitions')
})

test('file in (-i), style flags, pipe out', () => {
  expect(
    execSync('node dist/bin/cli.js -i ./test/resources/Enum.json --style.singleQuote --no-style.semi').toString(),
  ).toMatchFileSnapshot('./snapshots/cli-file-style-flags')
})
