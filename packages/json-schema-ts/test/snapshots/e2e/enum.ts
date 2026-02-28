export type Enum = { 
	stringEnum: 'a' | 'b' | 'c';
	impliedStringEnum: 'a' | 'b' | 'c';
	booleanEnum: true;
	impliedBooleanEnum: true;
	integerEnum: -1 | 0 | 1;
	impliedIntegerEnum: -1 | 0 | 1;
	numberEnum?: -1.1 | 0 | 1.2;
	namedIntegerEnum?: 1 | 2 | 3;
	impliedNamedIntegerEnum: 4 | 5 | 6;
	impliedHeterogeneousEnum?: -20.1 | null | 'foo' | false;
	namedIntegerEnumTitle: 1 | 2 | 3;
	impliedNamedIntegerEnumTitle: 4 | 5 | 6;
	enumThatComesFromADefinition?: EnumFromDefinition;
	propertyWithAnEnum?: { enumThatComesFromADefinition?: EnumFromDefinition }
 };

export type EnumFromDefinition = 'a' | 'b' | 'c';