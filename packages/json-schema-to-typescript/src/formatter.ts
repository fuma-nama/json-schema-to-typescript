import { Options } from './'

export async function format(code: string, options: Options): Promise<string> {
  if (!options.format) {
    return code
  }

  const prettier = await import('prettier/standalone')
  return prettier.format(code, { parser: 'typescript', ...options.style })
}
