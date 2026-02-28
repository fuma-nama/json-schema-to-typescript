export type Countries = {
id: string
name: string
}[]

export interface ArrayOfSchema {
countries?: Countries
tuple?: []|[{
foo?: string
}]|[{
foo?: string
}, {
bar?: number
}]
}
