/*Core schema meta-schema*/ export type JSONSchema = { 
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
	additionalItems?: boolean | JSONSchema;
	items?: JSONSchema | SchemaArray;
	maxItems?: PositiveInteger;
	minItems?: PositiveIntegerDefault0;
	uniqueItems?: boolean;
	maxProperties?: PositiveInteger;
	minProperties?: PositiveIntegerDefault0;
	required?: StringArray;
	additionalProperties?: boolean | JSONSchema;
	definitions?: Record<string, JSONSchema>;
	properties?: Record<string, JSONSchema>;
	patternProperties?: Record<string, JSONSchema>;
	dependencies?: Record<string, JSONSchema | StringArray>;
	enum?: any[];
	type?: SimpleTypes | SimpleTypes[];
	allOf?: SchemaArray;
	anyOf?: SchemaArray;
	oneOf?: SchemaArray;
	not?: JSONSchema
 };

export type PositiveInteger = number;
export type PositiveIntegerDefault0 = PositiveInteger & unknown;
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

export type SchemaArray = JSONSchema[];