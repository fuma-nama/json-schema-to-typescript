import { Options } from '.'
import { generateType } from './generator'
import { AST, T_ANY, T_UNKNOWN } from './types/AST'
import { log } from './utils'

export function optimize(ast: AST, options: Options, processed = new Set<AST>()): AST {
  if (processed.has(ast)) {
    return ast
  }

  processed.add(ast)

  switch (ast.type) {
    case 'ARRAY':
      return Object.assign(ast, {
        params: optimize(ast.params, options, processed)
      })
    case 'INTERFACE':
      return Object.assign(ast, {
        params: ast.params.map(_ => Object.assign(_, { ast: optimize(_.ast, options, processed) }))
      })
    case 'INTERSECTION':
    case 'UNION':
      // Start with the leaves...
      const optimizedAST = Object.assign(ast, {
        params: ast.params.map(_ => optimize(_, options, processed))
      })

      // [A, B, C, Any] -> Any
      if (optimizedAST.params.some(_ => _.type === 'ANY')) {
        log('optimizer', '[A, B, C, Any] -> Any', optimizedAST)
        return T_ANY
      }

      // [A, B, C, Unknown] -> Unknown
      if (optimizedAST.params.some(_ => _.type === 'UNKNOWN')) {
        log('optimizer', '[A, B, C, Unknown] -> Unknown', optimizedAST)
        return T_UNKNOWN
      }

      // [A (named), A] -> [A (named)]
      if (
        optimizedAST.params.every(_ => {
          const a = generateType(omitStandaloneName(_), options)
          const b = generateType(omitStandaloneName(optimizedAST.params[0]), options)
          return a === b
        }) &&
        optimizedAST.params.some(_ => _.standaloneName !== undefined)
      ) {
        log('optimizer', '[A (named), A] -> [A (named)]', optimizedAST)
        optimizedAST.params = optimizedAST.params.filter(_ => _.standaloneName !== undefined)
      }

      // [A, B, B] -> [A, B]
      const params = deduplicate(optimizedAST.params, item => generateType(item, options))
      if (params.length !== optimizedAST.params.length) {
        log('optimizer', '[A, B, B] -> [A, B]', optimizedAST)
        optimizedAST.params = params
      }

      return Object.assign(optimizedAST, {
        params: optimizedAST.params.map(_ => optimize(_, options, processed))
      })
    default:
      return ast
  }
}

// TODO: More clearly disambiguate standalone names vs. aliased names instead.
function omitStandaloneName<A extends AST>(ast: A): A {
  switch (ast.type) {
    case 'ENUM':
      return ast
    default:
      return { ...ast, standaloneName: undefined }
  }
}

function deduplicate(asts: AST[], hasher: (item: AST) => string): AST[] {
  const out: AST[] = []
  const added = new Set<string>()

  for (const item of asts) {
    const hash = hasher(item)

    if (added.has(hash)) continue
    added.add(hash)
    out.push(item)
  }

  return out
}
