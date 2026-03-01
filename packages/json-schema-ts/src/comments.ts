import type { TSESTree as AST } from '@typescript-eslint/types'
import type { Comment } from 'esrap/languages/ts'

export function createCommentFactory() {
  return {
    all: new Map<AST.Node, Comment[]>(),
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

      if (a) {
        this.add(to, ...a)
        this.all.delete(from)
      }
    }
  }
}

const EscapeMap: Record<string, string> = {
  '*/': '*\\/',
  '@': '\\@',
  '{': '\\{',
  '}': '\\}'
}

export function escapeJSDocContent(code: string) {
  return code.replace(/(\*\/|[@{}])/g, match => {
    return EscapeMap[match] ?? match
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
