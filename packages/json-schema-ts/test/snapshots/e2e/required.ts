export interface Required {
location: (Location & {
[k: string]: unknown
})
name: string
website?: string
}
export interface Location {
city?: string
postalCode?: number
}
