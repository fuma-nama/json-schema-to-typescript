import { replace } from './utils'

export function createPendingFactory() {
  const allPendings = new WeakSet()

  return {
    create<T extends object>(defaultValue?: T) {
      const pending = defaultValue ?? ({} as T)
      allPendings.add(pending)
      return pending
    },

    is(obj: object) {
      return allPendings.has(obj)
    },

    resolve(obj: object, value: object) {
      if (!this.is(obj)) return
      replace(obj, value)
      allPendings.delete(obj)
    }
  }
}

export type PendingFactory = ReturnType<typeof createPendingFactory>
