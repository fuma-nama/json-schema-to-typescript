export interface SchemaWithSubschema {
firstName: string
friend?: {
knowsFrom: ("work" | "school" | "other")
}
coworker?: {
company?: {
name: string
}
[k: string]: KString
}
}

export const enum KString {
red = 10,
green = 20,
blue = 30
}

