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

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface BottleFilterParams extends PaginationParams {
  isForever?: boolean;
  userId?: string;
  sortBy?: "createdAt" | "likeCount" | "commentCount";
  sortOrder?: "asc" | "desc";
}

export interface CommentFilterParams extends PaginationParams {
  bottleId?: number;
  userId?: string;
}
