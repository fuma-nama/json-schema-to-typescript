export interface Cycle3 { foo?: Cycle4 }
export interface Cycle4 { foo?: number; bar?: Cycle3 }
export type RefWithCycle2 = { foo: Cycle3 } & Record<string, any>;