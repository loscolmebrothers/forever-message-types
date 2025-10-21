export interface Comment {
  id: number;
  bottleId: number;
  ipfsHash: string;
  createdAt: Date;
  exists: boolean;
}

export interface RawComment {
  id: bigint;
  bottleId: bigint;
  ipfsHash: string;
  createdAt: bigint;
  exists: boolean;
}

export interface CommentWithContent extends Comment {
  content: string;
  userId: string;
  type: "comment";
  timestamp: number;
}
