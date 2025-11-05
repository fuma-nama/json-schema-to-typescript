# Options

`json-schema-to-typescript` is very flexible, you can customise it with options.

## Compile Options

`compileFromFile` and `compile` accept options as their last argument (all keys are optional):

### `additionalProperties`

Default value for `additionalProperties`, when it is not explicitly set.

Default: `true`

### `bannerComment`

Disclaimer comment prepended to the top of each generated file.

### `customName`

Custom function to provide a type name for a given schema.

### `declareExternallyReferenced`

When enabled, declare external schemas referenced via `$ref`.

### `enableConstEnums`

When enabled, prepend enums with [`const`](https://www.typescriptlang.org/docs/handbook/enums.html#computed-and-constant-members).

Default: `true`

### `inferStringEnumKeysFromValues`

Create enums from JSON enums with eponymous keys.

Default: `false`

### `ignoreMinAndMaxItems`

Ignore maxItems and minItems for `array` types, preventing tuples being generated.

Default: `false`

### `maxItems`

Maximum number of unioned tuples to emit when representing bounded-size array types, before falling back to emitting unbounded arrays. Increase this to improve precision of emitted types, decrease it to improve performance, or set it to `-1` to ignore `maxItems`.

Default: `20`

### `strictIndexSignatures`

Append all index signatures with | undefined so that they are strictly typed.

Default: `false`

### `unknownAny`

Use `unknown` instead of `any` where possible.

Default: `false`

### `unreachableDefinitions`

Generates code for `$defs` that aren't referenced by the schema.

Default: `false`

### `$refOptions`

[$RefParser](https://github.com/APIDevTools/json-schema-ref-parser) Options, used when resolving `$ref`s

#### `$refOptions.cwd`

Additional option to specify the root directory for resolving [`$ref`](https://tools.ietf.org/id/draft-pbryan-zyp-json-ref-03.html)

Default: `process.cwd()`
