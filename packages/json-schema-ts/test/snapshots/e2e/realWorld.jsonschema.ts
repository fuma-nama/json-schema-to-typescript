export type RealWorldJsonschema = 
	{ 
		$id?: string;
		$schema?: string;
		$ref?: string;
		$comment?: string;
		title?: string;
		description?: string;
		default?: any;
		readOnly?: boolean;
		writeOnly?: boolean;
		examples?: any[];
		multipleOf?: number;
		maximum?: number;
		exclusiveMaximum?: number;
		minimum?: number;
		exclusiveMinimum?: number;
		maxLength?: NonNegativeInteger;
		minLength?: NonNegativeIntegerDefault0;
		pattern?: string;
		additionalItems?: RealWorldJsonschema;
		items?: RealWorldJsonschema | SchemaArray;
		maxItems?: NonNegativeInteger;
		minItems?: NonNegativeIntegerDefault0;
		uniqueItems?: boolean;
		contains?: RealWorldJsonschema;
		maxProperties?: NonNegativeInteger;
		minProperties?: NonNegativeIntegerDefault0;
		required?: StringArray;
		additionalProperties?: RealWorldJsonschema;
		definitions?: Record<string, RealWorldJsonschema>;
		properties?: Record<string, RealWorldJsonschema>;
		patternProperties?: Record<string, RealWorldJsonschema>;
		dependencies?: Record<string, RealWorldJsonschema | StringArray>;
		propertyNames?: RealWorldJsonschema;
		const?: any;
		enum?: any[];
		type?: SimpleTypes | SimpleTypes[];
		format?: string;
		contentMediaType?: string;
		contentEncoding?: string;
		if?: RealWorldJsonschema;
		then?: RealWorldJsonschema;
		else?: RealWorldJsonschema;
		allOf?: SchemaArray;
		anyOf?: SchemaArray;
		oneOf?: SchemaArray;
		not?: RealWorldJsonschema
	 } |
	boolean
;

export type NonNegativeInteger = number;
export type NonNegativeIntegerDefault0 = NonNegativeInteger & unknown;
export type SchemaArray = RealWorldJsonschema[];
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