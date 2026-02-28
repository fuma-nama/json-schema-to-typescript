export type Id = string
export type ArrayItems = ArrayItem[]

export interface ObjectWithArrayField {
data: ArrayItems
}
export interface ArrayItem {
id: Id
}
