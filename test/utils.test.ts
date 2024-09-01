import {expect, test} from 'vitest'
import {link} from '../src/linker'
import {pathTransform, generateName, isSchemaLike} from '../src/utils'

test('pathTransform', () => {
  expect(pathTransform('types', 'schemas', 'schemas/foo/a.json')).toBe('types/foo')
  expect(pathTransform('./schemas/types', './schemas', 'schemas/foo/bar/a.json')).toBe('schemas/types/foo/bar')
  expect(pathTransform('types', './src/../types/../schemas', 'schemas/foo/a.json')).toBe('types/foo')
})

test('generateName', () => {
  const usedNames = new Set<string>()
  expect(generateName('a', usedNames)).toBe('A')
  expect(generateName('abc', usedNames), ).toBe('Abc')
  expect(generateName('ABcd', usedNames), ).toBe('ABcd')
  expect(generateName('$Abc_123', usedNames), ).toBe('$Abc_123')
  expect(generateName('Abc-de-f', usedNames), ).toBe('AbcDeF')

  // Index should increment:
  expect(generateName('a', usedNames)).toBe('A1')
  expect(generateName('a', usedNames)).toBe('A2')
  expect(generateName('a', usedNames)).toBe('A3')
})
test('isSchemaLike', () => {
  const schema = link({
    title: 'Example Schema',
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
      },
      lastName: {
        id: 'lastName',
        type: 'string',
      },
    },
    required: ['firstName', 'lastName'],
  })
  
  expect(isSchemaLike(schema)).toBe(true)
  expect(isSchemaLike([])).toBe(false)
  expect(isSchemaLike(schema.properties)).toBe(false)
  expect(isSchemaLike(schema.required)).toBe(false)
  expect(isSchemaLike(schema.title)).toBe(false)
  expect(isSchemaLike(schema.properties!.firstName)).toBe(true)
  expect(isSchemaLike(schema.properties!.lastName)).toBe(true)
})
