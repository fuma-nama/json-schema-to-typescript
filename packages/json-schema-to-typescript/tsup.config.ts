import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/bin/cli.ts'],
  format: 'esm',
  target: 'es6',
  clean: true,
  dts: true
})
