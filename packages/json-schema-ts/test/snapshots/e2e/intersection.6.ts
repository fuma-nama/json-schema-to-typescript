export type Intersection6 = Car | Truck;
export type Car = Vehicle;
export type Vehicle = Thing;
export interface Thing { name: string }
export type Truck = Vehicle;