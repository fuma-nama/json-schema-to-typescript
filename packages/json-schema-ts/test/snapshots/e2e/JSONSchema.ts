/**
* Core schema meta-schema
*/
export interface  {
	id?: string;
	$schema?: string;
	title?: string;
	description?: string;
	default?: unknown;
	multipleOf?: number;
	maximum?: number;
	exclusiveMaximum?: boolean;
	minimum?: number;
	exclusiveMinimum?: boolean;
	maxLength?: PositiveInteger;
	minLength?: PositiveIntegerDefault0;
	pattern?: string;
	additionalItems?: boolean | ;
	items?:  | SchemaArray;
	maxItems?: PositiveInteger;
	minItems?: PositiveIntegerDefault0;
	uniqueItems?: boolean;
	maxProperties?: PositiveInteger;
	minProperties?: PositiveIntegerDefault0;
	required?: StringArray;
	additionalProperties?: boolean | ;
	definitions?: Record<string, >;
	properties?: Record<string, >;
	patternProperties?: Record<string, >;
	dependencies?: Record<string,  | StringArray>;
	enum?: any[];
	type?: SimpleTypes | SimpleTypes[];
	allOf?: SchemaArray;
	anyOf?: SchemaArray;
	oneOf?: SchemaArray;
	not?: 
}

export type PositiveInteger = number;
export type PositiveIntegerDefault0 = PositiveInteger & unknown;
export type SchemaArray = [];
export type StringArray = string[];

export type SimpleTypes = 
	'array' |
	'boolean' |
	'integer' |
	'null' |
	'number' |
	'object' |
	'string'
;

export type JSONSchema = ;