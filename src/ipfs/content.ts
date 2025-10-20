export interface BottleContent {
  content: string;
  type: "bottle";
  userId: string;
  timestamp: number;
  createdAt: string;
}

export interface CommentContent {
  content: string;
  type: "comment";
  bottleId: number;
  userId: string;
  timestamp: number;
  createdAt: string;
}

export type IPFSContent = BottleContent | CommentContent;

export interface UploadResult {
  cid: string;
  size: number;
  url: string;
}

export class IPFSError extends Error {
  constructor(
    public code: IPFSErrorCode,
    message: string,
    public originalError?: Error,
  ) {
    super(message);
    this.name = "IPFSError";
  }
}

export enum IPFSErrorCode {
  INIT_FAILED = "INIT_FAILED",
  UPLOAD_FAILED = "UPLOAD_FAILED",
  FETCH_FAILED = "FETCH_FAILED",
  INVALID_CID = "INVALID_CID",
  PARSE_FAILED = "PARSE_FAILED",
  NOT_INITIALIZED = "NOT_INITIALIZED",
  SPACE_REGISTRATION_FAILED = "SPACE_REGISTRATION_FAILED",
}
