import { JSONSchema, Parent, LinkedJSONSchema } from './types/JSONSchema'
import { isPlainObject } from './utils'
import { JSONSchema4Type } from 'json-schema'

/**
 * Traverses over the schema, giving each node a reference to its
 * parent node. We need this for downstream operations.
 */
export function link(schema: JSONSchema4Type | JSONSchema, parent: JSONSchema4Type | null = null): LinkedJSONSchema {
  if (!Array.isArray(schema) && !isPlainObject(schema)) {
    return schema as unknown as LinkedJSONSchema
  }

  // Handle cycles
  if ((schema as JSONSchema).hasOwnProperty(Parent)) {
    return schema as LinkedJSONSchema
  }

  if (schema)
    Object.assign(schema, {
      [Parent]: parent
    })

  // Arrays
  if (Array.isArray(schema)) {
    schema.forEach(child => link(child, schema))
  }

  // Objects
  for (const key in schema as JSONSchema) {
    link((schema as JSONSchema)[key], schema)
  }

  return schema as LinkedJSONSchema
}
