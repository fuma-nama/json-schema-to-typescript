export type RefWithCycle1 = 
	{ foo: RefWithCycle1; bar?: RefWithCycle1 } &
	Record<string, any>
;