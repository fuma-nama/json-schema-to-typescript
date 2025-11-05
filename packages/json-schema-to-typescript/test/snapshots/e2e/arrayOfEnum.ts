export interface ArrayOfEnum {
namedEnum: NamedEnum[]
tuples?: []|[string]|[string, NamedEnum2]
}

export const enum NamedEnum {
One = 1,
Two = 2,
Three = 3
}
export const enum NamedEnum2 {
One = 1,
Two = 2,
Three = 3
}

