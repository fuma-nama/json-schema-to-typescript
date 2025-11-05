# @fumari/json-schema-to-typescript

## 2.0.0

### Major Changes

- ca826ca: **No longer dereference schemas by default**

  In general, most usage has a dereferenced schema a head of time, or needs re-using them.
  Dereferencing schemas on user-land is more efficient, hence now the default.

  To enable dereferencing, use the `refsPlugins()` and install `@apidevtools/json-schema-ref-parser`:

  ```ts
  import { compile } from '@fumari/json-schema-to-typescript'
  import { refsPlugin } from '@fumari/json-schema-to-typescript/plugins/refs'

  const res = await compile(schema, 'Person', {
    plugins: [refsPlugin()]
  })
  ```

- e1f400b: **Make `prettier` optional**

  It now prefers the plugin system to manage similar needs:

  ```ts
  import { compile } from '@fumari/json-schema-to-typescript'
  import { prettierPlugin } from '@fumari/json-schema-to-typescript/plugins/prettier'

  const res = await compile(schema, 'Person', {
    plugins: [prettierPlugin()]
  })
  ```

### Patch Changes

- 1e04119: Allow Map-like structure for `schemaToId`
- 0421cd0: Move `cwd` option to `$refOptions.cwd`

## 1.1.3

### Patch Changes

- c1eb7fb: Bump deps

## 1.1.2

### Patch Changes

- 5bb63c7: Make refs public
- a04791f: Support to pass `schemaToId` to compile

## 1.1.1

### Patch Changes

- 726b8b4: Support disabling schema dereference

## 1.1.0

### Minor Changes

- 4860d52: Reduce size

## 1.0.1

### Patch Changes

- split cli into separate package
