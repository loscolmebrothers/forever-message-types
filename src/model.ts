import type { ContractBottle } from "./contract";

export interface Bottle extends ContractBottle {
  message: string;
  userId: string;
  type: "bottle";
  timestamp: number;
  likeCount: number;
}
