# Introduction

`json-schema-to-typescript` compiles JSON Schema to TypeScript typings.

Check out the [live demo](https://borischerny.com/json-schema-to-typescript-browser/).

## Installation

::: code-group

```sh [npm]
npm install json-schema-to-typescript
```

```sh [pnpm]
pnpm add json-schema-to-typescript
```

```sh [yarn]
yarn add json-schema-to-typescript
```

:::

## Usage

Transform your JSON Schema to TypeScript Definitions.

```js
import { compile, compileFromFile } from 'json-schema-to-typescript'

// compile from file
compileFromFile('foo.json')
  .then(ts => fs.writeFileSync('foo.d.ts', ts))

// or, compile a JS object
let mySchema = {
  properties: [...]
}
compile(mySchema, 'MySchema')
  .then(ts => ...)
```

You can see [Options](/options) for available options.

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

Prettier is known to run slowly on really big files. To skip formatting and improve performance, set the `format` option to `false`.

## Further Reading

- JSON-schema spec: https://tools.ietf.org/html/draft-zyp-json-schema-04
- JSON-schema wiki: https://github.com/json-schema/json-schema/wiki
- JSON-schema test suite: https://github.com/json-schema/JSON-Schema-Test-Suite/blob/node
- TypeScript spec: https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md

## Who uses JSON-Schema-to-TypeScript?

- [Alibaba](https://github.com/alibaba/lowcode-engine)
- [Amazon](https://github.com/aws/aws-toolkit-vscode), [AWSLabs](https://github.com/awslabs/cdk8s)
- [Expo](https://github.com/expo/expo)
- [FormatJS](https://github.com/formatjs/formatjs)
- [Microsoft](https://github.com/microsoft/mixed-reality-extension-sdk)
- [Mozilla](https://github.com/mdn/browser-compat-data)
- [Nx](https://github.com/nrwl/nx)
- [RStudio](https://github.com/rstudio/rstudio)
- [Sourcegraph](https://github.com/sourcegraph/sourcegraph)
- [Stryker](https://github.com/stryker-mutator/stryker)
- [Webpack](https://github.com/webpack/webpack)
- [See more](https://github.com/bcherny/json-schema-to-typescript/network/dependents?package_id=UGFja2FnZS0xNjUxOTM5Mg%3D%3D)
