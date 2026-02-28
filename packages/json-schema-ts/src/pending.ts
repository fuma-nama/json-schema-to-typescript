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

    setPending(obj: object, value: unknown) {
      for (const key in obj) {
        delete obj[key as never]
      }

      Object.assign(obj, value)
    },

    unmarkPending(obj: object) {
      allPendings.delete(obj)
    }
  }
}

export type PendingFactory = ReturnType<typeof createPendingFactory>
