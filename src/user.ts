export interface User {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserLimits {
  userId: string;
  dailyBottleUsed: Date | null;
  dailyCommentsUsed: number;
  bottles: number[];
  comments: number[];
}

export interface UserLike {
  userId: string;
  bottleId: number;
  createdAt: Date;
}

export interface UserSession {
  user: User;
  limits: UserLimits;
  likedBottles: number[];
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  session: UserSession | null;
  loading: boolean;
}
