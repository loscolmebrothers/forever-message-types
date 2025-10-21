import type { ContractBottle, ContractComment } from "./contract";

export interface Bottle extends ContractBottle {
  message: string;
  userId: string;
  type: "bottle";
  timestamp: number;
  likeCount: number;
  commentCount: number;
}

export interface Comment extends ContractComment {
  message: string;
  userId: string;
  type: "comment";
  timestamp: number;
}
