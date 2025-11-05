import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/plugins/*'],
  format: 'esm',
  target: 'es6',
  clean: true,
  dts: true
})
