export type MyString = string

export interface Intersection {
A: (string | null)
B: (string | null)
C: (string | null)
D: (string | null)
E: (MyString | null)
F: (string | null)
G: (MyString | null)
H: (("foo" | "bar") | null)
I: ((string | number) | null)
J: ({
foo: string
bar: number
} | null)
}
