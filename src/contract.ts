export interface ContractBottle {
  id: number;
  creator: string;
  ipfsHash: string;
  createdAt: Date;
  expiresAt: Date;
  isForever: boolean;
  exists: boolean;
}

export interface RawContractBottle {
  id: bigint;
  creator: string;
  ipfsHash: string;
  createdAt: bigint;
  expiresAt: bigint;
  isForever: boolean;
  exists: boolean;
}
