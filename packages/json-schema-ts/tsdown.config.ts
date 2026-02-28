import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  format: 'esm',
  target: 'es6',
  clean: true,
  deps: {
    onlyAllowBundle: []
  },
  dts: true
})
