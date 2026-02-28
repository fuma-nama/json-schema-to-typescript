export type Required = { 
	location: 
		{ city?: string; postalCode?: number } &
		Record<'postalCode', unknown>
	;
	name: string;
	website?: string
 };