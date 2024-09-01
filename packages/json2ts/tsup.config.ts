import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/cli.ts'],
  format: 'esm',
  target: 'es6',
  clean: true,
})
