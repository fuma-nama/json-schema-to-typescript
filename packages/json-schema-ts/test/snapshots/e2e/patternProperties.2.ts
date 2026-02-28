export type PatternProperties2 = 
	{ a?: number; b?: string } &
	Record<string, { aProperty?: string }>
;