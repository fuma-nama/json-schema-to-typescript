/*Validation schema for OpenAPI Specification 3.0.X.*/ export type Intersection3 = 
	{ 
		openapi: string;
		info: 
			{ 
				title: string;
				description?: string;
				termsOfService?: string;
				contact?: 
					{ name?: string; url?: string; email?: string } &
					Record<string, unknown>
				;
				license?: { name: string; url?: string } & Record<string, unknown>;
				version: string
			 } &
			Record<string, unknown>
		;
		externalDocs?: ExternalDocumentation;
		servers?: Server[];
		security?: SecurityRequirement[];
		tags?: 
			{ 
				name: string;
				description?: string;
				externalDocs?: ExternalDocumentation
			 } &
			Record<string, unknown>
		[];

		paths: Record<string, 
				{ 
					$ref?: string;
					summary?: string;
					description?: string;
					servers?: Server[];
					parameters?: Parameter | Reference[]
				 } &

				Record<string, 
						{ 
							tags?: string[];
							summary?: string;
							description?: string;
							externalDocs?: ExternalDocumentation;
							operationId?: string;
							parameters?: Parameter | Reference[];
							requestBody?: RequestBody | Reference;
							responses: 
								{ default?: Response | Reference } &
								Record<string, Response | Reference | unknown>
							;
							callbacks?: Record<string, Callback | Reference>;
							deprecated?: boolean;
							security?: SecurityRequirement[];
							servers?: Server[]
						 } &
						Record<string, unknown>
					 |
					unknown
				>
			 |
			unknown
		>;

		components?: 
			{ 
				schemas?: Record<string, 
						{ 
							title?: string;
							multipleOf?: number;
							maximum?: number;
							exclusiveMaximum?: boolean;
							minimum?: number;
							exclusiveMinimum?: boolean;
							maxLength?: number;
							minLength?: number;
							pattern?: string;
							maxItems?: number;
							minItems?: number;
							uniqueItems?: boolean;
							maxProperties?: number;
							minProperties?: number;
							required?: string[];
							enum?: unknown[];
							type?: 
								'array' |
								'boolean' |
								'integer' |
								'number' |
								'object' |
								'string'
							;
							not?: Schema | Reference;
							allOf?: Schema | Reference[];
							oneOf?: Schema | Reference[];
							anyOf?: Schema | Reference[];
							items?: Schema | Reference;
							properties?: Record<string, Schema | Reference>;
							additionalProperties?: Schema | Reference | boolean;
							description?: string;
							format?: string;
							default?: unknown;
							nullable?: boolean;
							discriminator?: { propertyName: string; mapping?: Record<string, string> };
							readOnly?: boolean;
							writeOnly?: boolean;
							example?: unknown;
							externalDocs?: ExternalDocumentation;
							deprecated?: boolean;
							xml?: 
								{ 
									name?: string;
									namespace?: string;
									prefix?: string;
									attribute?: boolean;
									wrapped?: boolean
								 } &
								Record<string, unknown>
						 } &
						Record<string, unknown>
					 |
					Reference
				>;
				responses?: Record<string, Reference | Response>;
				parameters?: Record<string, Reference | Parameter>;
				examples?: Record<string, 
					Reference |
						{ 
							summary?: string;
							description?: string;
							value?: unknown;
							externalValue?: string
						 } &
						Record<string, unknown>
				>;
				requestBodies?: Record<string, Reference | RequestBody>;
				headers?: Record<string, Reference | Header>;
				securitySchemes?: Record<string, 
					Reference |
							{ 
								type: 'apiKey';
								name: string;
								in: 'header' | 'query' | 'cookie';
								description?: string
							 } &
							Record<string, unknown>
						 |

							/*Bearer*/ { scheme?: 'bearer' } |
							/*Non Bearer*/ Exclude<unknown, Record<'bearerFormat', unknown>>
						 |

							{ 
								type: 'oauth2';
								flows: 
									{ 
										implicit?: 
											{ 
												authorizationUrl: string;
												refreshUrl?: string;
												scopes: Record<string, string>
											 } &
											Record<string, unknown>
										;

										password?: 
											{ 
												tokenUrl: string;
												refreshUrl?: string;
												scopes?: Record<string, string>
											 } &
											Record<string, unknown>
										;

										clientCredentials?: 
											{ 
												tokenUrl: string;
												refreshUrl?: string;
												scopes?: Record<string, string>
											 } &
											Record<string, unknown>
										;

										authorizationCode?: 
											{ 
												authorizationUrl: string;
												tokenUrl: string;
												refreshUrl?: string;
												scopes?: Record<string, string>
											 } &
											Record<string, unknown>
									 } &
									Record<string, unknown>
								;
								description?: string
							 } &
							Record<string, unknown>
						 |

							{ 
								type: 'openIdConnect';
								openIdConnectUrl: string;
								description?: string
							 } &
							Record<string, unknown>
				>;
				links?: Record<string, Reference | Link>;
				callbacks?: Record<string, Reference | Callback>
			 } &
			Record<string, unknown>
	 } &
	Record<string, unknown>
;

export type ExternalDocumentation = 
	{ description?: string; url: string } &
	Record<string, unknown>
;

export type Server = 
	{ 
		url: string;
		description?: string;
		variables?: Record<string, 
			{ enum?: string[]; default: string; description?: string } &
			Record<string, unknown>
		>
	 } &
	Record<string, unknown>
;

export type Parameter = 
	/*Example and examples are mutually exclusive*/ ExampleXORExamples &
	/*Schema and content are mutually exclusive, at least one is required*/ SchemaXORContent &
	/*Parameter location*/ 
		/*Parameter in path*/ { 
			in?: 'path';
			style?: 'matrix' | 'label' | 'simple';
			required: true
		 } |

		/*Parameter in query*/ { 
			in?: 'query';
			style?: 'form' | 'spaceDelimited' | 'pipeDelimited' | 'deepObject'
		 } |
		/*Parameter in header*/ { in?: 'header'; style?: 'simple' } |
		/*Parameter in cookie*/ { in?: 'cookie'; style?: 'form' }
;

export type Reference = Record<string, string>;
export type ExampleXORExamples = Exclude<unknown, Record<'example' | 'examples', unknown>>;
export type SchemaXORContent = Exclude<unknown, Record<'schema' | 'content', unknown>>;

export type MediaType = 
	/*Example and examples are mutually exclusive*/ ExampleXORExamples
;

export type Response = 
	{ 
		description: string;
		headers?: Record<string, Header | Reference>;
		content?: Record<string, MediaType>;
		links?: Record<string, Link | Reference>
	 } &
	Record<string, unknown>
;

export type PathItem = 
	{ 
		$ref?: string;
		summary?: string;
		description?: string;
		servers?: Server[];
		parameters?: Parameter | Reference[]
	 } &

	Record<string, 
			{ 
				tags?: string[];
				summary?: string;
				description?: string;
				externalDocs?: ExternalDocumentation;
				operationId?: string;
				parameters?: Parameter | Reference[];
				requestBody?: RequestBody | Reference;
				responses: 
					{ default?: Response | Reference } &
					Record<string, Response | Reference | unknown>
				;
				callbacks?: Record<string, Callback | Reference>;
				deprecated?: boolean;
				security?: SecurityRequirement[];
				servers?: Server[]
			 } &
			Record<string, unknown>
		 |
		unknown
	>
;

export type SecurityRequirement = Record<string, string[]>;

export type Schema = 
	{ 
		title?: string;
		multipleOf?: number;
		maximum?: number;
		exclusiveMaximum?: boolean;
		minimum?: number;
		exclusiveMinimum?: boolean;
		maxLength?: number;
		minLength?: number;
		pattern?: string;
		maxItems?: number;
		minItems?: number;
		uniqueItems?: boolean;
		maxProperties?: number;
		minProperties?: number;
		required?: string[];
		enum?: unknown[];
		type?: 
			'array' |
			'boolean' |
			'integer' |
			'number' |
			'object' |
			'string'
		;
		not?: Schema | Reference;
		allOf?: Schema | Reference[];
		oneOf?: Schema | Reference[];
		anyOf?: Schema | Reference[];
		items?: Schema | Reference;
		properties?: Record<string, Schema | Reference>;
		additionalProperties?: Schema | Reference | boolean;
		description?: string;
		format?: string;
		default?: unknown;
		nullable?: boolean;
		discriminator?: { propertyName: string; mapping?: Record<string, string> };
		readOnly?: boolean;
		writeOnly?: boolean;
		example?: unknown;
		externalDocs?: ExternalDocumentation;
		deprecated?: boolean;
		xml?: 
			{ 
				name?: string;
				namespace?: string;
				prefix?: string;
				attribute?: boolean;
				wrapped?: boolean
			 } &
			Record<string, unknown>
	 } &
	Record<string, unknown>
;

export type RequestBody = 
	{ 
		description?: string;
		content: Record<string, MediaType>;
		required?: boolean
	 } &
	Record<string, unknown>
;

export type Header = 
	/*Example and examples are mutually exclusive*/ ExampleXORExamples &
	/*Schema and content are mutually exclusive, at least one is required*/ SchemaXORContent
;

export type Link = Exclude<unknown, /*Operation Id and Operation Ref are mutually exclusive*/ Record<'operationId' | 'operationRef', unknown>>;
export type Callback = Record<string, unknown | PathItem>;