import path from 'path'
import { fileURLToPath } from 'url'

export const input = {
  title: 'Referencing',
  type: 'object',
  properties: {
    foo: {
      $ref: 'test/resources/ReferencedTypeWithoutID.json'
    },
    bar: {
      $ref: 'test/resources/ReferencedTypeWithoutIDConflict.json'
    }
  },
  required: ['foo', 'bar'],
  additionalProperties: false
}

export const ref = {
  cwd: path.join(path.dirname(fileURLToPath(import.meta.url)), '../resources')
}
