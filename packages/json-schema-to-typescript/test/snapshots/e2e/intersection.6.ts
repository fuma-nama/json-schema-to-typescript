export type Intersection = (Car | Truck)
export type Car = (Vehicle & {
numDoors: number
})
export type Vehicle = (Thing & {
year: number
})
export type Truck = (Vehicle & {
numAxles: number
})

export interface Thing {
name: string
}
