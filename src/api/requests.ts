export interface CreateBottleRequest {
  content: string;
  userId: string;
}

export interface CreateCommentRequest {
  content: string;
  bottleId: number;
  userId: string;
}

export interface LikeBottleRequest {
  bottleId: number;
  userId: string;
}

export interface UnlikeBottleRequest {
  bottleId: number;
  userId: string;
}
