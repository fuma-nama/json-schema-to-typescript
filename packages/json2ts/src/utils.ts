import { basename, dirname, extname, normalize, sep, posix } from 'node:path'

/**
 * Eg. `foo/bar/baz.json` => `baz`
 */
export function justName(filename = ''): string {
  return basename(filename, extname(filename))
}

export function error(...messages: unknown[]): void {
  if (!process.env.VERBOSE) {
    return console.error(messages)
  }
  console.error('[error]', ...messages)
}

/*
the following logic determines the out path by comparing the in path to the users specified out path.
For example, if input directory MultiSchema looks like:
  MultiSchema/foo/a.json
  MultiSchema/bar/fuzz/c.json
  MultiSchema/bar/d.json
And the user wants the outputs to be in MultiSchema/Out, then this code will be able to map the inner directories foo, bar, and fuzz into the intended Out directory like so:
  MultiSchema/Out/foo/a.json
  MultiSchema/Out/bar/fuzz/c.json
  MultiSchema/Out/bar/d.json
*/
export function pathTransform(outputPath: string, inputPath: string, filePath: string): string {
  const inPathList = normalize(inputPath).split(sep)
  const filePathList = dirname(normalize(filePath)).split(sep)
  const filePathRel = filePathList.filter((f, i) => f !== inPathList[i])

  return posix.join(posix.normalize(outputPath), ...filePathRel)
}
