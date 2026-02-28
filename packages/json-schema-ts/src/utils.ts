/**
 * Convert any string into a valid TypeScript type name.
 * Removes special characters, converts to PascalCase, and ensures name starts with a letter.
 */
export function toSafeString(str: string): string {
  const dotIdx = str.lastIndexOf('/')
  if (dotIdx !== -1) {
    str = str.slice(dotIdx + 1)
  }

  // Convert to string if not already
  const value = str
    .normalize()
    // Replace special characters with spaces
    .replace(/[^a-zA-Z0-9_$]/g, ' ')
    // Convert to PascalCase
    .replace(/(^\w|\s+\w|_\w|\d\w)/g, letter => {
      if (letter.startsWith('_')) return letter.slice(1).toUpperCase()

      return letter.trim().toUpperCase()
    })
    // Remove spaces
    .replace(/\s+/g, '')
    // Ensure starts with valid letter
    .replace(/^\d+/, '')

  return value
}

export function isValidPropertyName(name: string) {
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name)
}

/**
 * replace objects in-place
 */
export function replace(obj: object, by: object) {
  for (const key in obj) {
    delete obj[key as never]
  }

  Object.assign(obj, by)
}
