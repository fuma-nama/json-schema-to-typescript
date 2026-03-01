export type RealWorldSchemaStore1 = 
	Exclude<unknown, Record<'bundledDependencies' | 'bundleDependencies', unknown>> |
	Exclude<unknown, Record<'bundleDependencies', unknown>> |
	Exclude<unknown, Record<'bundledDependencies', unknown>>
;