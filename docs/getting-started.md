# Introduction

`json-schema-to-typescript` compiles JSON Schema to TypeScript typings.

Check out the [live demo](https://borischerny.com/json-schema-to-typescript-browser/).

:::info

This library is forked from https://github.com/bcherny/json-schema-to-typescript.
Consider to support the original repo by giving it a star.

:::

## Installation

::: code-group

```sh [npm]
npm install @fumari/json-schema-to-typescript
```

```sh [pnpm]
pnpm add @fumari/json-schema-to-typescript
```

```sh [yarn]
yarn add @fumari/json-schema-to-typescript
```

:::

## Usage

Transform your JSON Schema to TypeScript Definitions.

```js
import { compile } from '@fumari/json-schema-to-typescript'

const mySchema = {
  properties: [...]
}

compile(mySchema, 'MySchema')
  .then(ts => console.log(ts))
```

YAML and JSON files are also supported.

```js
import fs from 'node:fs'
import { compileJsonFile, compileYamlFile } from '@fumari/json-schema-to-typescript'

compileJsonFile(fs.readFileSync('foo.json'), 'MyType').then(ts => fs.writeFileSync('foo.d.ts', ts))

compileYamlFile(fs.readFileSync('foo.yaml'), 'MyType').then(ts => fs.writeFileSync('foo.d.ts', ts))
```

You can see [Options](/options) for available options.

### Formatting

By default, it doesn't format the output TypeScript code.

You can install `prettier` and enable the Prettier plugin to format outputs:

::: code-group

```sh [npm]
npm install prettier
```

```sh [pnpm]
pnpm add prettier
```

```sh [yarn]
yarn add prettier
```

:::

```js
import { compile } from '@fumari/json-schema-to-typescript'
import { prettierPlugin } from '@fumari/json-schema-to-typescript/plugins/prettier'

const mySchema = {
  properties: [...]
}

await compile(mySchema, 'MySchema', {
  plugins: [prettierPlugin()]
})
```

## Features

### Supported

- `title` => `interface`
- Primitive types:
  - array
  - homogeneous array
  - boolean
  - integer
  - number
  - null
  - object
  - string
  - homogeneous enum
  - heterogeneous enum
- Non/extensible interfaces
- Nested properties
- Schema definitions
- [Schema references](http://json-schema.org/latest/json-schema-core.html#rfc.section.7.2.2)
- Local (filesystem) schema references
- External (network) schema references
- Add support for running in browser
- default interface name
- infer unnamed interface name from filename
- `deprecated`
- `allOf` ("intersection")
- `anyOf` ("union")
- `oneOf` (treated like `anyOf`)
- `maxItems`
- `minItems`
- `additionalProperties` of type
- `patternProperties` (partial support)
- [`extends`](https://github.com/json-schema/json-schema/wiki/Extends/014e3cd8692250baad70c361dd81f6119ad0f696)
- `required` properties on objects
- literal objects in enum
- referencing schema by id
- custom typescript types via `tsType`

### Unsupported

- `validateRequired`
- Custom JSON-schema extensions

### Not expressible in TypeScript

- `dependencies` ([single](https://github.com/tdegrunt/jsonschema/blob/67c0e27ce9542efde0bf43dc1b2a95dd87df43c3/examples/all.js#L261), [multiple](https://github.com/tdegrunt/jsonschema/blob/67c0e27ce9542efde0bf43dc1b2a95dd87df43c3/examples/all.js#L282))
- `divisibleBy` ([example](https://github.com/tdegrunt/jsonschema/blob/67c0e27ce9542efde0bf43dc1b2a95dd87df43c3/examples/all.js#L185))
- [`format`](https://github.com/json-schema/json-schema/wiki/Format) ([example](https://github.com/tdegrunt/jsonschema/blob/67c0e27ce9542efde0bf43dc1b2a95dd87df43c3/examples/all.js#L209))
- `multipleOf` ([example](https://github.com/tdegrunt/jsonschema/blob/67c0e27ce9542efde0bf43dc1b2a95dd87df43c3/examples/all.js#L186))
- `maximum` ([example](https://github.com/tdegrunt/jsonschema/blob/67c0e27ce9542efde0bf43dc1b2a95dd87df43c3/examples/all.js#L183))
- `minimum` ([example](https://github.com/tdegrunt/jsonschema/blob/67c0e27ce9542efde0bf43dc1b2a95dd87df43c3/examples/all.js#L182))
- `maxProperties` ([example](https://github.com/tdegrunt/jsonschema/blob/67c0e27ce9542efde0bf43dc1b2a95dd87df43c3/examples/all.js#L113))
- `minProperties` ([example](https://github.com/tdegrunt/jsonschema/blob/67c0e27ce9542efde0bf43dc1b2a95dd87df43c3/examples/all.js#L112))
- `not`/`disallow`
- `oneOf` ("xor", use `anyOf` instead)
- `pattern` ([string](https://github.com/tdegrunt/jsonschema/blob/67c0e27ce9542efde0bf43dc1b2a95dd87df43c3/examples/all.js#L203), [regex](https://github.com/tdegrunt/jsonschema/blob/67c0e27ce9542efde0bf43dc1b2a95dd87df43c3/examples/all.js#L207))
- `uniqueItems` ([example](https://github.com/tdegrunt/jsonschema/blob/67c0e27ce9542efde0bf43dc1b2a95dd87df43c3/examples/all.js#L172))

## Custom schema properties

### `tsType`

Overrides the type that's generated from the schema. Useful for forcing a type to `any` or when using non-standard JSON schema extensions.

```ts
export const input = {
  title: 'CustomType',
  type: 'object',
  properties: {
    bar: {
      description: 'Comparator function',
      instanceOf: 'Function',
      tsType: '(a: number, b: number) => number'
    },
    foobar: { $ref: '#/definitions/foobar' }
  },
  definitions: {
    foobar: {
      description: 'Map from number to string',
      tsType: 'Map<number, string>'
    }
  }
}
```

### `tsEnumNames`

Overrides the names used for the elements in an enum. Can also be used to create string enums.

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "WP_Post_Status_Name",
  "type": "string",
  "tsEnumNames": ["publish", "draft", "auto_draft"],
  "enum": ["publish", "draft", "auto-draft"]
}
```

## FAQ

### It is crashing on my giant file. What can I do?

1. Disable code formatting if you've Prettier plugin enabled.
2. Check if there's any issue resolving recursive schemas, welcome to open a bug report.

## Further Reading

- JSON-schema spec: https://tools.ietf.org/html/draft-zyp-json-schema-04
- JSON-schema wiki: https://github.com/json-schema/json-schema/wiki
- JSON-schema test suite: https://github.com/json-schema/JSON-Schema-Test-Suite/blob/node
- TypeScript spec: https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md
