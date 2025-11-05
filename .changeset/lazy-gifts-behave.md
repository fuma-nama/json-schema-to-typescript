---
'@fumari/json-schema-to-typescript': major
---

**No longer dereference schemas by default**

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
