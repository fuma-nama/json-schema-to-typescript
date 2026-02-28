export interface RefWithCycle {
owner?: Person
}
export interface Person {
name?: string
children?: Person
}
