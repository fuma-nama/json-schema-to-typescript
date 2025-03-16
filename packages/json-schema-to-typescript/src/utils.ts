import { Intersection, JSONSchema, LinkedJSONSchema, NormalizedJSONSchema, Parent } from './types/JSONSchema'

export function Try<T>(fn: () => T, err: (e: Error) => T): T {
  try {
    return fn()
  } catch (e) {
    return err(e as Error)
  }
}

// keys that shouldn't be traversed by the catchall step
const BLACKLISTED_KEYS = new Set([
  'id',
  '$defs',
  '$id',
  '$schema',
  'title',
  'description',
  'default',
  'multipleOf',
  'maximum',
  'exclusiveMaximum',
  'minimum',
  'exclusiveMinimum',
  'maxLength',
  'minLength',
  'pattern',
  'additionalItems',
  'items',
  'maxItems',
  'minItems',
  'uniqueItems',
  'maxProperties',
  'minProperties',
  'required',
  'additionalProperties',
  'definitions',
  'properties',
  'patternProperties',
  'dependencies',
  'enum',
  'type',
  'allOf',
  'anyOf',
  'oneOf',
  'not'
])

function traverseObjectKeys(
  obj: Record<string, LinkedJSONSchema>,
  callback: (schema: LinkedJSONSchema, key: string | null) => void,
  processed: Set<LinkedJSONSchema>
) {
  Object.keys(obj).forEach(k => {
    if (obj[k] && typeof obj[k] === 'object' && !Array.isArray(obj[k])) {
      traverse(obj[k], callback, processed, k)
    }
  })
}

function traverseArray(
  arr: LinkedJSONSchema[],
  callback: (schema: LinkedJSONSchema, key: string | null) => void,
  processed: Set<LinkedJSONSchema>
) {
  arr.forEach((s, k) => traverse(s, callback, processed, k.toString()))
}

function traverseIntersection(
  schema: LinkedJSONSchema,
  callback: (schema: LinkedJSONSchema, key: string | null) => void,
  processed: Set<LinkedJSONSchema>
) {
  if (typeof schema !== 'object' || !schema) {
    return
  }

  const r = schema as unknown as Record<string | symbol, unknown>
  const intersection = r[Intersection] as NormalizedJSONSchema | undefined
  if (!intersection) {
    return
  }

  if (Array.isArray(intersection.allOf)) {
    traverseArray(intersection.allOf, callback, processed)
  }
}

export function traverse(
  schema: LinkedJSONSchema,
  callback: (schema: LinkedJSONSchema, key: string | null) => void,
  processed = new Set<LinkedJSONSchema>(),
  key?: string
): void {
  // Handle recursive schemas
  if (processed.has(schema)) {
    return
  }

  processed.add(schema)
  callback(schema, key ?? null)

  if (schema.anyOf) {
    traverseArray(schema.anyOf, callback, processed)
  }
  if (schema.allOf) {
    traverseArray(schema.allOf, callback, processed)
  }
  if (schema.oneOf) {
    traverseArray(schema.oneOf, callback, processed)
  }
  if (schema.properties) {
    traverseObjectKeys(schema.properties, callback, processed)
  }
  if (schema.patternProperties) {
    traverseObjectKeys(schema.patternProperties, callback, processed)
  }
  if (schema.additionalProperties && typeof schema.additionalProperties === 'object') {
    traverse(schema.additionalProperties, callback, processed)
  }
  if (schema.items) {
    const { items } = schema
    if (Array.isArray(items)) {
      traverseArray(items, callback, processed)
    } else {
      traverse(items, callback, processed)
    }
  }
  if (schema.additionalItems && typeof schema.additionalItems === 'object') {
    traverse(schema.additionalItems, callback, processed)
  }
  if (schema.dependencies) {
    if (Array.isArray(schema.dependencies)) {
      traverseArray(schema.dependencies, callback, processed)
    } else {
      traverseObjectKeys(schema.dependencies as LinkedJSONSchema, callback, processed)
    }
  }
  if (schema.definitions) {
    traverseObjectKeys(schema.definitions, callback, processed)
  }
  if (schema.$defs) {
    traverseObjectKeys(schema.$defs, callback, processed)
  }
  if (schema.not) {
    traverse(schema.not, callback, processed)
  }
  traverseIntersection(schema, callback, processed)

  // technically you can put definitions on any key
  Object.keys(schema)
    .filter(key => !BLACKLISTED_KEYS.has(key))
    .forEach(key => {
      const child = schema[key]
      if (child && typeof child === 'object') {
        traverseObjectKeys(child, callback, processed)
      }
    })
}

/**
 * Convert any string into a valid TypeScript type name.
 * Removes special characters, converts to PascalCase, and ensures name starts with a letter.
 */
export function toSafeString(str: string): string {
  // Convert to string if not already
  const value = str
    .normalize()
    // Replace special characters with spaces
    .replace(/[^a-zA-Z0-9_$]/g, ' ')
    // Convert to PascalCase
    .replace(/(^\w|\s+\w|_\w|\d\w)/g, letter => {
      if (letter.startsWith('_')) return letter.slice(1).toUpperCase()

      return letter.trim().toUpperCase()
    })
    // Remove spaces
    .replace(/\s+/g, '')
    // Ensure starts with valid letter
    .replace(/^\d+/, '')

  return value
}

export function generateName(from: string, usedNames: Set<string>) {
  let name = toSafeString(from)
  if (!name) {
    name = 'NoName'
  }

  // increment counter until we find a free name
  if (usedNames.has(name)) {
    let counter = 1
    let nameWithCounter = `${name}${counter}`
    while (usedNames.has(nameWithCounter)) {
      nameWithCounter = `${name}${counter}`
      counter++
    }
    name = nameWithCounter
  }

  usedNames.add(name)
  return name
}

export function error(...messages: unknown[]): void {
  console.error('[error]', ...messages)
}

export function log(title: string, ...messages: unknown[]): void {
  if (!process.env.VERBOSE) {
    return
  }
  let lastMessage = null
  if (messages.length > 1 && typeof messages[messages.length - 1] !== 'string') {
    lastMessage = messages.splice(messages.length - 1, 1)
  }
  console.info(`[debug]`, title, ...messages)
  if (lastMessage) {
    console.dir(lastMessage, { depth: 6, maxArrayLength: 6 })
  }
}

/**
 * escape block comments in schema descriptions so that they don't unexpectedly close JSDoc comments in generated typescript interfaces
 */
export function escapeBlockComment(schema: JSONSchema) {
  const replacer = '* /'
  if (schema === null || typeof schema !== 'object') {
    return
  }
  for (const key of Object.keys(schema)) {
    if (key === 'description' && typeof schema[key] === 'string') {
      schema[key] = schema[key]!.replace(/\*\//g, replacer)
    }
  }
}

/**
 * Removes the schema's `default` property if it doesn't match the schema's `type` property.
 * Useful when parsing unions.
 *
 * Mutates `schema`.
 */
export function maybeStripDefault(schema: LinkedJSONSchema): LinkedJSONSchema {
  if (!('default' in schema)) {
    return schema
  }

  switch (schema.type) {
    case 'array':
      if (Array.isArray(schema.default)) {
        return schema
      }
      break
    case 'boolean':
      if (typeof schema.default === 'boolean') {
        return schema
      }
      break
    case 'integer':
    case 'number':
      if (typeof schema.default === 'number') {
        return schema
      }
      break
    case 'string':
      if (typeof schema.default === 'string') {
        return schema
      }
      break
    case 'null':
      if (schema.default === null) {
        return schema
      }
      break
    case 'object':
      if (isPlainObject(schema.default)) {
        return schema
      }
      break
  }
  delete schema.default
  return schema
}

export function appendToDescription(existingDescription: string | undefined, ...values: string[]): string {
  if (existingDescription) {
    return `${existingDescription}\n\n${values.join('\n')}`
  }
  return values.join('\n')
}

export function isSchemaLike(schema: unknown): schema is LinkedJSONSchema {
  if (!isPlainObject(schema) || !schema || typeof schema !== 'object') {
    return false
  }

  // top-level schema
  const parent = schema[Parent as keyof typeof schema]
  if (parent === null) {
    return true
  }

  const JSON_SCHEMA_KEYWORDS = [
    '$defs',
    'allOf',
    'anyOf',
    'definitions',
    'dependencies',
    'enum',
    'not',
    'oneOf',
    'patternProperties',
    'properties',
    'required'
  ]
  if (JSON_SCHEMA_KEYWORDS.some(_ => parent[_] === schema)) {
    return false
  }

  return true
}

export function omit<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> {
  const result = { ...obj }
  for (const key of keys) {
    delete result[key]
  }
  return result
}

export function isPlainObject(value: unknown): value is object {
  if (!value || typeof value !== 'object') {
    return false
  }

  // Check if prototype is null or Object.prototype
  const proto = Object.getPrototypeOf(value)
  if (proto === null) {
    return true
  }

  // Check if constructor is Object
  const Ctor = Object.prototype.hasOwnProperty.call(proto, 'constructor') && proto.constructor
  return (
    typeof Ctor === 'function' &&
    Ctor instanceof Ctor &&
    Function.prototype.toString.call(Ctor) === Function.prototype.toString.call(Object)
  )
}

export function deepMerge<T>(target: unknown, ...sources: unknown[]): T {
  if (!sources.length) return target as T
  const source = sources.shift() as Record<string, unknown>

  if (isPlainObject(target) && isPlainObject(source)) {
    const _target = target as Record<string, unknown>

    for (const key in source) {
      if (isPlainObject(source[key])) {
        if (!(key in target) || typeof _target[key] !== 'object') Object.assign(_target, { [key]: {} })

        deepMerge(_target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }

      if (Array.isArray(source[key])) {
        if (!Array.isArray(_target[key])) _target[key] = [] as never

        const arr = _target[key] as unknown[]
        arr.push(source[key])
      }
    }
  }

  return deepMerge(target, ...sources)
}
