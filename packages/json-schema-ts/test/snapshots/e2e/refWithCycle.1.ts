export type LocalCycle = { foo: LocalCycle; bar?: LocalCycle } & Record<string, any>;
export type RefWithCycle1 = LocalCycle;