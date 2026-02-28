/**
 * Convert any string into a valid TypeScript type name.
 * Removes special characters, converts to PascalCase, and ensures name starts with a letter.
 */
export function toSafeString(str: string): string {
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
