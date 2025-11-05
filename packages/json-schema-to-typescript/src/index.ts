import { JSONSchema4 } from 'json-schema'
import { ParserOptions as $RefOptions } from '@apidevtools/json-schema-ref-parser'
import { generate } from './generator'
import { normalize } from './normalizer'
import { optimize } from './optimizer'
import { parse } from './parser'
import { dereference, type RawRefResolver } from './resolver'
import { deepMerge, error } from './utils'
import { validate } from './validator'
import { link } from './linker'
import { validateOptions } from './optionValidator'
import { JSONSchema as LinkedJSONSchema } from './types/JSONSchema'

export type { EnumJSONSchema, JSONSchema, NamedEnumJSONSchema, CustomTypeJSONSchema } from './types/JSONSchema'

type Awaitable<T> = T | Promise<T>

export interface Plugin {
  config?: (options: Options) => Awaitable<Options | undefined>
  output?: (code: string) => Awaitable<string | undefined>
}

export interface Options {
  /**
   * [$RefParser](https://github.com/APIDevTools/json-schema-ref-parser) Options, used when resolving `$ref`s
   *
   * If `false`, disable dereferencing
   */
  $refOptions:
    | ($RefOptions & {
        /**
         * Root directory for resolving [`$ref`](https://tools.ietf.org/id/draft-pbryan-zyp-json-ref-03.html)s.
         */
        cwd?: string
      })
    | false

  /**
   * Default value for additionalProperties, when it is not explicitly set.
   */
  additionalProperties: boolean
  /**
   * Disclaimer comment prepended to the top of each generated file.
   */
  bannerComment: string
  /**
   * Custom function to provide a type name for a given schema
   */
  customName?: (schema: LinkedJSONSchema, keyNameFromDefinition: string | undefined) => string | undefined
  /**
   * Declare external schemas referenced via `$ref`?
   */
  declareExternallyReferenced: boolean
  /**
   * Prepend enums with [`const`](https://www.typescriptlang.org/docs/handbook/enums.html#computed-and-constant-members)?
   */
  enableConstEnums: boolean
  /**
   * Create enums from JSON enums with eponymous keys
   */
  inferStringEnumKeysFromValues: boolean
  /**
   * Ignore maxItems and minItems for `array` types, preventing tuples being generated.
   */
  ignoreMinAndMaxItems: boolean
  /**
   * Maximum number of unioned tuples to emit when representing bounded-size array types,
   * before falling back to emitting unbounded arrays. Increase this to improve precision
   * of emitted types, decrease it to improve performance, or set it to `-1` to ignore
   * `minItems` and `maxItems`.
   */
  maxItems: number
  /**
   * Append all index signatures with `| undefined` so that they are strictly typed.
   *
   * This is required to be compatible with `strictNullChecks`.
   */
  strictIndexSignatures: boolean
  /**
   * Generate code for `definitions` that aren't referenced by the schema?
   */
  unreachableDefinitions: boolean
  /**
   * Generate unknown type instead of any
   */
  unknownAny: boolean

  /**
   * When `$refOptions` is disabled, this is used to find the original ref id from schema.
   *
   * Required for dereferenced schemas to resolve cyclic references
   */
  schemaToId?: RawRefResolver

  plugins: Plugin[]
}

export const DEFAULT_OPTIONS: Options = {
  $refOptions: {},
  additionalProperties: false,
  bannerComment: '',
  declareExternallyReferenced: true,
  enableConstEnums: true,
  inferStringEnumKeysFromValues: false,
  ignoreMinAndMaxItems: false,
  maxItems: 20,
  strictIndexSignatures: false,
  plugins: [],
  unreachableDefinitions: false,
  unknownAny: true
}

export function compileJsonFile(
  file: string | Buffer,
  name: string,
  options: Partial<Options> = DEFAULT_OPTIONS
): Promise<string> {
  let schema: JSONSchema4
  try {
    schema = JSON.parse(getContent(file))
  } catch (e) {
    throw new TypeError(`Error parsing JSON in "${name}"`, { cause: e })
  }

  return compile(schema, name, options)
}

function getContent(file: string | Buffer): string {
  return file.toString()
}

export async function compileYamlFile(
  file: string | Buffer,
  name: string,
  options: Partial<Options> = DEFAULT_OPTIONS
): Promise<string> {
  let schema: JSONSchema4
  try {
    const { load } = await import('js-yaml')
    schema = (await load(getContent(file))) as JSONSchema4
  } catch (e) {
    throw new TypeError(`Error parsing YML in "${name}"`, { cause: e })
  }

  return compile(schema, name, options)
}

export async function compile(
  schema: JSONSchema4,
  name: string,
  compileOptions: Partial<Options> = {}
): Promise<string> {
  validateOptions(compileOptions)
  let options = deepMerge<Options>({}, DEFAULT_OPTIONS, compileOptions)

  for (const plugin of options.plugins) {
    options = (await plugin.config?.(options)) ?? options
  }

  const { dereferencedSchema, dereferencedPaths } =
    options.$refOptions !== false
      ? await dereference(schema, options.$refOptions.cwd ?? process.cwd(), options.$refOptions)
      : { dereferencedSchema: schema, dereferencedPaths: options.schemaToId }

  const linked = link(dereferencedSchema)
  const errors = validate(linked, name)
  if (errors.length) {
    errors.forEach(_ => error(_))
    throw new ValidationError()
  }

  const normalized = normalize(linked, dereferencedPaths, name, options)
  const parsed = parse(normalized, options)
  const optimized = optimize(parsed, options)
  let output = generate(optimized, options)

  for (const plugin of options.plugins) {
    output = (await plugin.output?.(output)) ?? output
  }

  return output
}

export class ValidationError extends Error {}
