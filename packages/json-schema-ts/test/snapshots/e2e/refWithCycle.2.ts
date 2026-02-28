export type RefWithCycle2 = 
	{ foo: { foo?: { foo?: number; bar?: Cycle3 } } } &
	Record<string, any>
;

export type Cycle3 = { foo?: { foo?: number; bar?: Cycle3 } };