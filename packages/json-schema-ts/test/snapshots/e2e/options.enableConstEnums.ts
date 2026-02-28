export interface Enum {
stringEnum: ("a" | "b" | "c")
impliedStringEnum: ("a" | "b" | "c")
booleanEnum: true
impliedBooleanEnum: true
integerEnum: (-1 | 0 | 1)
impliedIntegerEnum: (-1 | 0 | 1)
numberEnum?: (-1.1 | 0 | 1.2)
namedIntegerEnum?: NamedIntegerEnum
impliedNamedIntegerEnum: ImpliedNamedIntegerEnum
impliedHeterogeneousEnum?: (-20.1 | null | "foo" | false)
namedIntegerEnumTitle: NamedInteger
impliedNamedIntegerEnumTitle: ImpliedNamedInteger
oneOfNamedEnum: (IntegerOneOfNamedEnum | StringOneOfNamedEnum)
anyOfNamedEnum: (IntegerAnyOfNamedEnum | StringAnyOfNamedEnum)
allOfNamedEnum: (IntegerAllOfNamedEnum & StringAllOfNamedEnum)
}

export const enum NamedIntegerEnum {
One = 1,
Two = 2,
Three = 3
}
export const enum ImpliedNamedIntegerEnum {
Four = 4,
Five = 5,
Six = 6
}
export const enum NamedInteger {
One = 1,
Two = 2,
Three = 3
}
export const enum ImpliedNamedInteger {
Four = 4,
Five = 5,
Six = 6
}
export const enum IntegerOneOfNamedEnum {
One = 1,
Two = 2,
Three = 3
}
export const enum StringOneOfNamedEnum {
Four = "four",
Five = "five",
Six = "six"
}
export const enum IntegerAnyOfNamedEnum {
One = 1,
Two = 2,
Three = 3
}
export const enum StringAnyOfNamedEnum {
Four = "four",
Five = "five",
Six = "six"
}
export const enum IntegerAllOfNamedEnum {
One = 1,
Two = 2,
Three = 3
}
export const enum StringAllOfNamedEnum {
Four = "four",
Five = "five",
Six = "six"
}

