import path from 'path'
import { fileURLToPath } from 'url'

export const input = {
  title: 'Referencing',
  type: 'object',
  properties: {
    foo: {
      $ref: 'ReferencedTypeWithoutID.json'
    },
    bar: {
      $ref: 'ReferencedTypeWithoutIDConflict.json'
    }
  },
  required: ['foo', 'bar'],
  additionalProperties: false
}

export const ref = {
  cwd: path.join(path.dirname(fileURLToPath(import.meta.url)), '../resources')
}
