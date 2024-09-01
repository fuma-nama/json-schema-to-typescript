import { expect, test } from "vitest"
import { pathTransform } from "../src/utils"

test('pathTransform', () => {
  expect(pathTransform('types', 'schemas', 'schemas/foo/a.json')).toBe('types/foo')
  expect(pathTransform('./schemas/types', './schemas', 'schemas/foo/bar/a.json')).toBe('schemas/types/foo/bar')
  expect(pathTransform('types', './src/../types/../schemas', 'schemas/foo/a.json')).toBe('types/foo')
})