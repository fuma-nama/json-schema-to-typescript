/**
 * This is version 1.03 of the JSON-stat 2.0 Schema (2016-05-04)
 */
export type JSONStat20Schema = ({
class: "dataset"
version: Version
href?: Href
label?: Label
note?: Note
link?: Link
updated?: Updated
source?: Source
error?: Error
extension?: Extension
id: Note
size: number[]
role?: {
time?: Note
geo?: Note
metric?: Note
}
dimension: {
[k: string]: {
href?: Href
label?: Label
note?: Note
link?: Link
extension?: Extension
category: Category
}
}
value: ((number | null | string)[] | {
[k: string]: (number | null | string)
})
status?: (string | string[] | {
[k: string]: string
})
} | {
class: "dimension"
version: Version
href?: Href
label?: Label
note?: Note
link?: Link
updated?: Updated
source?: Source
error?: Error
extension?: Extension
category: Category
} | {
class: "collection"
version: Version
href?: Href
label?: Label
note?: Note
link: {
item?: {
type?: string
class?: ("dataset" | "collection" | "dimension")
href?: Href
label?: Label
note?: Note
link?: Link
updated?: Updated
source?: Source
extension?: Extension
category?: Category
id?: Note
size?: number[]
role?: {
time?: Note
geo?: Note
metric?: Note
}
dimension?: {
[k: string]: {
href?: Href
label?: Label
note?: Note
link?: Link
extension?: Extension
category: Category
}
}
value?: ((number | null | string)[] | {
[k: string]: (number | null | string)
})
status?: (string | string[] | {
[k: string]: string
})
}[]
}
updated?: Updated
source?: Source
error?: Error
extension?: Extension
})
export type Version = "2.0"
export type Href = string
export type Label = string
export type Note = string[]
export type Updated = string
export type Source = string
export type Error = unknown[]

export interface Link {
/**
 * This interface was referenced by `Link`'s JSON-Schema definition
 * via the `patternProperty` "^(about|alternate|appendix|archives|author|blocked-by|bookmark|canonical|chapter|collection|contents|copyright|create-form|current|derivedfrom|describedby|describes|disclosure|dns-prefetch|duplicate|edit|edit-form|edit-media|enclosure|first|glossary|help|hosts|hub|icon|index|item|last|latest-version|license|lrdd|memento|monitor|monitor-group|next|next-archive|nofollow|noreferrer|original|payment|pingback|preconnect|predecessor-version|prefetch|preload|prerender|prev|preview|previous|prev-archive|privacy-policy|profile|related|replies|search|section|self|service|start|stylesheet|subsection|successor-version|tag|terms-of-service|timegate|timemap|type|up|version-history|via|webmention|working-copy|working-copy-of)$".
 */
[k: string]: {
type?: string
class?: ("dataset" | "collection" | "dimension")
href?: Href
label?: Label
note?: Note
link?: Link
updated?: Updated
source?: Source
extension?: Extension
category?: Category
id?: Note
size?: number[]
role?: {
time?: Note
geo?: Note
metric?: Note
}
dimension?: {
[k: string]: {
href?: Href
label?: Label
note?: Note
link?: Link
extension?: Extension
category: Category
}
}
value?: ((number | null | string)[] | {
[k: string]: (number | null | string)
})
status?: (string | string[] | {
[k: string]: string
})
}[]
}
export interface Extension {

}
export interface Category {
index?: (Note | {
[k: string]: number
})
label?: {
[k: string]: string
}
note?: {
[k: string]: Note
}
unit?: {
[k: string]: {
label?: Label
decimals?: number
position?: ("start" | "end")
}
}
coordinates?: {
[k: string]: []|[number]|[number, number]
}
child?: {
[k: string]: Note
}
}
