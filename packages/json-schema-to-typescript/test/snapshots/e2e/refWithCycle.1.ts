export interface LocalCycle {
foo: LocalCycle
bar?: LocalCycle
[k: string]: unknown
}
