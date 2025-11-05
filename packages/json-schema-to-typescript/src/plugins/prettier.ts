import type { Options as PrettierOptions, Plugin as PrettierPlugin } from 'prettier'
import type { Plugin } from '..'
import { format } from 'prettier/standalone'
import estreePlugin from 'prettier/plugins/estree'
import typescriptPlugin from 'prettier/plugins/typescript'

/**
 * A plugin to format output code, requires `prettier` to be installed in runtime.
 *
 * @param prettierOptions - A [Prettier](https://prettier.io/docs/en/options.html) configuration.
 */
export function prettierPlugin(
  prettierOptions: PrettierOptions = {
    bracketSpacing: false,
    printWidth: 120,
    semi: true,
    singleQuote: false,
    tabWidth: 2,
    trailingComma: 'none',
    useTabs: false
  }
): Plugin {
  return {
    output(code) {
      return format(code, {
        parser: 'typescript',
        plugins: [estreePlugin, typescriptPlugin] as PrettierPlugin[],
        ...prettierOptions
      })
    }
  }
}
