export interface Cycle2 {
foo: Cycle3
[k: string]: unknown
}
export interface Cycle3 {
foo?: Cycle4
}
export interface Cycle4 {
foo?: number
bar?: Cycle3
}
