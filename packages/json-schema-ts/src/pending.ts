import { replace } from './utils'

export function createPendingFactory() {
  const allPendings = new WeakSet()

  return {
    createPending<T extends object>(defaultValue?: T) {
      const pending = defaultValue ?? ({} as T)
      allPendings.add(pending)
      return pending
    },

    isPending(obj: object) {
      return allPendings.has(obj)
    },

    resolvePending(obj: object, value: object) {
      replace(obj, value)
      allPendings.delete(obj)
    }
  }
}

export type PendingFactory = ReturnType<typeof createPendingFactory>
