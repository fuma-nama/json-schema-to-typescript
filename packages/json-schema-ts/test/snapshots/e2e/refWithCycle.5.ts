export interface RefWithCycle5 { owner?: PersonJson }
export interface PersonJson { name?: string; children?: PersonJson }