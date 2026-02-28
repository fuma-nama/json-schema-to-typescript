export interface Location { city?: string; postalCode?: number }

export interface Required {
	location: Location & Record<'postalCode', unknown>;
	name: string;
	website?: string
}