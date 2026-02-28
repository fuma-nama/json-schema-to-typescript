export type ArrayOfSchema2 = { 
	description: string;
	schema: unknown;
	tests: { description: string; data: unknown; valid: boolean }[]
 }[];