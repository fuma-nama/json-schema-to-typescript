export interface PersonJson { name?: string; children?: PersonJson }
export interface RefWithCycle5 { owner?: PersonJson }