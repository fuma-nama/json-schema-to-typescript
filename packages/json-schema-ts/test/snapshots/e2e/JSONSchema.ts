/**
* Core schema meta-schema
* @default `{}`
*/
export interface JSONSchema {
	/**
	* @format `uri`
	*/
	id?: string;

	/**
	* @format `uri`
	*/
	$schema?: string;
	title?: string;
	description?: string;
	default?: unknown;
	/**
	* @minimum `0`
	* @exclusiveMinimum `true`
	*/
	multipleOf?: number;
	maximum?: number;
	/**
	* @default `false`
	*/
	exclusiveMaximum?: boolean;
	minimum?: number;
	/**
	* @default `false`
	*/
	exclusiveMinimum?: boolean;
	maxLength?: PositiveInteger;
	minLength?: PositiveIntegerDefault0;
	/**
	* @format `regex`
	*/
	pattern?: string;

	/**
	* @default `{}`
	*/
	additionalItems?: boolean | JSONSchema;

	/**
	* @default `{}`
	*/
	items?: JSONSchema | SchemaArray;
	maxItems?: PositiveInteger;
	minItems?: PositiveIntegerDefault0;
	/**
	* @default `false`
	*/
	uniqueItems?: boolean;
	maxProperties?: PositiveInteger;
	minProperties?: PositiveIntegerDefault0;
	required?: StringArray;
	/**
	* @default `{}`
	*/
	additionalProperties?: boolean | JSONSchema;

	/**
	* @default `{}`
	*/
	definitions?: Record<string, JSONSchema>;

	/**
	* @default `{}`
	*/
	properties?: Record<string, JSONSchema>;

	/**
	* @default `{}`
	*/
	patternProperties?: Record<string, JSONSchema>;
	dependencies?: Record<string, JSONSchema | StringArray>;
	/**
	* @minItems `1`
	* @uniqueItems
	*/
	enum?: any[];

	type?: 
		SimpleTypes |
		/**
		* @minItems `1`
		* @uniqueItems
		*/
		SimpleTypes[]
	;
	allOf?: SchemaArray;
	anyOf?: SchemaArray;
	oneOf?: SchemaArray;
	not?: JSONSchema
}

/**
* @minimum `0`
*/
export type PositiveInteger = number;

export type PositiveIntegerDefault0 = 
	PositiveInteger &
	/**
	* @default `0`
	*/
	unknown
;

/**
* @minItems `1`
*/
export type SchemaArray = JSONSchema[];

/**
* @minItems `1`
* @uniqueItems
*/
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