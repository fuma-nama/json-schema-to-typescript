export type RefWithCycle5 = { owner?: { name?: string; children?: PersonJson } };
export type PersonJson = { name?: string; children?: PersonJson };