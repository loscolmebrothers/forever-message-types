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

export interface ContractComment {
  id: number;
  bottleId: number;
  commenter: string;
  ipfsHash: string;
  createdAt: Date;
  exists: boolean;
}

export interface RawContractComment {
  id: bigint;
  bottleId: bigint;
  commenter: string;
  ipfsHash: string;
  createdAt: bigint;
  exists: boolean;
}
