import {expect, test} from 'vitest'
import {JSONSchema4} from 'json-schema'
import {compile} from '../src'

const SCHEMA: JSONSchema4 = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
    },
  },
  required: ['firstName'],
}

test('compile() should not mutate its input', async () => {
  const before = structuredClone(SCHEMA)
  await compile(SCHEMA, 'A')

  expect(before).toStrictEqual(SCHEMA)
})

test('compile() should be idempotent', async () => {
  const a = await compile(SCHEMA, 'A')
  const b = await compile(SCHEMA, 'A')

  expect(a).toStrictEqual(b)
})
