export type OptionsStrictIndexSignatures = 
	{ 
		maybe?: string;
		complex?: { maybe?: string } & Record<string, { maybe?: string }>
	 } &
	Record<string, string>
;