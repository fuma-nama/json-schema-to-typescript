export type ArrayOfSchema = {
description: string
schema: unknown
/**
 * @minItems 1
 */
tests: [{
description: string
data: unknown
valid: boolean
}, ...({
description: string
data: unknown
valid: boolean
})[]]
}[]
