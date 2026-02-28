export type JSONSchemaForNPMPackageJsonFiles = 
	Exclude<unknown, Record<'bundledDependencies' | 'bundleDependencies', unknown>> |
	Exclude<unknown, Record<'bundleDependencies', unknown>> |
	Exclude<unknown, Record<'bundledDependencies', unknown>>
;

export type RealWorldSchemaStore1 = JSONSchemaForNPMPackageJsonFiles;