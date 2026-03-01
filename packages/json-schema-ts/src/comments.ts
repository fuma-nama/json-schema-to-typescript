import type { TSESTree as AST } from '@typescript-eslint/types'
import type { Comment } from 'esrap/languages/ts'

export function createCommentFactory() {
  return {
    all: new Map<AST.Node, Comment[]>(),
    get(node: AST.Node) {
      return this.all.get(node)
    },
    add(node: AST.Node, ...comments: Comment[]) {
      const list = this.all.get(node)
      if (!list) {
        this.all.set(node, comments)
      } else {
        list.push(...comments)
      }
    },
    transfer(from: AST.Node, to: AST.Node) {
      const a = this.all.get(from)

      if (a && a.length > 0) {
        this.add(to, ...a)
        this.all.delete(from)
      }
    },
    delete(node: AST.Node) {
      this.all.delete(node)
    }
  }
}

export function escapeJSDocContent(code: string, escapeCode = false) {
  const regex = escapeCode ? /(\*\/|[@`])/g : /(\*\/|@)/g

  return code.replace(regex, match => {
    if (match === '*/') return '*\\/'
    return `\\${match}`
  })
}

export function formatComment(c: Comment) {
  if (c.type === 'Block') {
    const lines = c.value
      .trim()
      .split('\n')
      .map(v => `* ${v}`)
    return {
      ...c,
      value: `*\n${lines.join('\n')}\n`
    }
  }

  return c
}

export type CommentFactory = ReturnType<typeof createCommentFactory>
