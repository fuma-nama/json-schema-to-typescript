export interface StrictIndexSignatures {
maybe?: string
complex?: {
maybe?: string
[k: string]: Leaf | undefined
}
[k: string]: string | undefined
}
export interface Leaf {
maybe?: string
}
