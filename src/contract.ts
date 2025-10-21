export interface ContractBottle {
  id: number;
  ipfsHash: string;
  createdAt: Date;
  expiresAt: Date;
  isForever: boolean;
  exists: boolean;
}

export interface RawContractBottle {
  id: bigint;
  ipfsHash: string;
  createdAt: bigint;
  expiresAt: bigint;
  isForever: boolean;
  exists: boolean;
}

export interface ContractComment {
  id: number;
  bottleId: number;
  ipfsHash: string;
  createdAt: Date;
  exists: boolean;
}

export interface RawContractComment {
  id: bigint;
  bottleId: bigint;
  ipfsHash: string;
  createdAt: bigint;
  exists: boolean;
}
