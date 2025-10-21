export interface Bottle {
  id: number;
  ipfsHash: string;
  createdAt: Date;
  expiresAt: Date;
  likeCount: number;
  commentCount: number;
  isForever: boolean;
  exists: boolean;
}

export interface RawBottle {
  id: bigint;
  ipfsHash: string;
  createdAt: bigint;
  expiresAt: bigint;
  likeCount: bigint;
  commentCount: bigint;
  isForever: boolean;
  exists: boolean;
}

export interface BottleWithContent extends Bottle {
  content: string;
  userId: string;
  type: "bottle";
  timestamp: number;
}
