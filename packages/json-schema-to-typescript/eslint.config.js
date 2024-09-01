import eslintConfigPrettier from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'

export default [{ files: ['src/**/*.{js,mjs,cjs,ts}'] }, eslintConfigPrettier, ...tseslint.configs.recommended]
