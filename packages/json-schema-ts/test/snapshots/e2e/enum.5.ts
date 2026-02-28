export interface Enum {
stringEnum: StringEnum
impliedStringEnum: ("a" | "b" | "c")
booleanEnum: true
impliedBooleanEnum: true
integerEnum: (-1 | 0 | 1)
impliedIntegerEnum: (-1 | 0 | 1)
}

export const enum StringEnum {
a = "a",
b = "b",
c = "c"
}

