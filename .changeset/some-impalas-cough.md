---
'@fumari/json-schema-to-typescript': major
---

**Make `prettier` optional**

It now prefers the plugin system to manage similar needs:

```ts
import { compile } from '@fumari/json-schema-to-typescript'
import { prettierPlugin } from '@fumari/json-schema-to-typescript/plugins/prettier'

const res = await compile(schema, 'Person', {
  plugins: [prettierPlugin()]
})
```
