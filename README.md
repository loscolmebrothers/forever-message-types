# Forever Message - Types

Shared TypeScript type definitions for the Forever Message multi-user platform. Provides type-safe interfaces across contract, IPFS, and application layers.

## Overview

This package defines types for the three-layer architecture:
- **Contract Layer**: Blockchain data (bottles, comments, ownership)
- **IPFS Layer**: Decentralized storage (messages, metadata, errors)
- **Model Layer**: Combined application models (UI-ready data)

## Installation

```bash
yarn add @loscolmebrothers/forever-message-types
```

## Structure

```
src/
├── contract.ts    # Smart contract types (ContractBottle, ContractComment)
├── ipfs.ts        # IPFS storage types (IPFSBottle, IPFSComment, errors)
├── model.ts       # Combined models for UI (Bottle, Comment)
├── user.ts        # User and authentication types
└── index.ts       # Main exports
```

## Usage

### Contract Layer Types

Types for blockchain smart contract data:

```typescript
import {
  ContractBottle,
  RawContractBottle,
  ContractComment,
  RawContractComment
} from '@loscolmebrothers/forever-message-types';

const rawBottle: RawContractBottle = await contract.getBottle(id);

const bottle: ContractBottle = {
  id: Number(rawBottle.id),
  ipfsHash: rawBottle.ipfsHash,
  createdAt: new Date(Number(rawBottle.createdAt) * 1000),
  expiresAt: new Date(Number(rawBottle.expiresAt) * 1000),
  creator: rawBottle.creator,
  isForever: rawBottle.isForever,
  exists: rawBottle.exists
};
```

### IPFS Layer Types

Types for IPFS storage and retrieval:

```typescript
import {
  IPFSBottle,
  IPFSComment,
  UploadResult,
  IPFSError,
  IPFSErrorCode
} from '@loscolmebrothers/forever-message-types';

const result: UploadResult = await ipfs.uploadBottle(message, userId);

const bottleData: IPFSBottle = await ipfs.getItem<IPFSBottle>(cid);
console.log(bottleData.message);
console.log(`${bottleData.likeCount} likes, ${bottleData.commentCount} comments`);

try {
  const data = await ipfs.getItem(cid);
} catch (error) {
  if (error instanceof IPFSError) {
    if (error.code === IPFSErrorCode.FETCH_FAILED) {
      console.error('Failed to fetch from IPFS');
    }
  }
}
```

### Model Layer Types

Combined types for application UI:

```typescript
import { Bottle, Comment } from '@loscolmebrothers/forever-message-types';

const bottle: Bottle = {
  id: contractBottle.id,
  ipfsHash: contractBottle.ipfsHash,
  createdAt: contractBottle.createdAt,
  expiresAt: contractBottle.expiresAt,
  creator: contractBottle.creator,
  isForever: contractBottle.isForever,
  exists: contractBottle.exists,
  
  message: ipfsData.message,
  userId: ipfsData.userId,
  type: ipfsData.type,
  timestamp: ipfsData.timestamp,
  likeCount: ipfsData.likeCount,
  commentCount: ipfsData.commentCount
};
```

### User Types

Types for authentication and user management:

```typescript
import {
  User,
  UserLimits,
  UserSession,
  AuthState
} from '@loscolmebrothers/forever-message-types';

const user: User = {
  id: 'user123',
  address: '0x1234...',
  displayName: 'John Doe',
  createdAt: new Date()
};

const session: UserSession = {
  user,
  limits: {
    maxBottles: 10,
    maxComments: 50,
    maxLikes: 100
  },
  likedBottles: [1, 5, 8]
};
```

## Type Reference

### Contract Types

#### ContractBottle

```typescript
interface ContractBottle {
  id: number;
  ipfsHash: string;
  createdAt: Date;
  expiresAt: Date;
  creator: string;      // Ethereum address
  isForever: boolean;
  exists: boolean;
}
```

**Purpose**: Represents bottle data from smart contract (converted from blockchain types).

#### RawContractBottle

```typescript
interface RawContractBottle {
  id: bigint;
  ipfsHash: string;
  createdAt: bigint;
  expiresAt: bigint;
  creator: string;
  isForever: boolean;
  exists: boolean;
}
```

**Purpose**: Raw contract data before conversion (bigint timestamps).

#### ContractComment

```typescript
interface ContractComment {
  id: number;
  bottleId: number;
  ipfsHash: string;
  createdAt: Date;
  commenter: string;    // Ethereum address
}
```

**Purpose**: Represents comment data from smart contract.

#### RawContractComment

```typescript
interface RawContractComment {
  id: bigint;
  bottleId: bigint;
  ipfsHash: string;
  createdAt: bigint;
  commenter: string;
}
```

**Purpose**: Raw comment data before conversion.

### IPFS Types

#### IPFSBottle

```typescript
interface IPFSBottle {
  message: string;
  type: 'bottle';
  userId: string;
  timestamp: number;
  createdAt: string;
  likeCount: number;
  commentCount: number;
}
```

**Purpose**: Bottle content stored in IPFS.

#### IPFSComment

```typescript
interface IPFSComment {
  message: string;
  type: 'comment';
  bottleId: number;
  userId: string;
  timestamp: number;
  createdAt: string;
}
```

**Purpose**: Comment content stored in IPFS.

#### IPFSItem

```typescript
type IPFSItem = IPFSBottle | IPFSComment;
```

**Purpose**: Union type for any IPFS content.

#### UploadResult

```typescript
interface UploadResult {
  cid: string;          // IPFS content identifier
  size: number;         // Size in bytes
  url: string;          // Gateway URL
}
```

**Purpose**: Result of IPFS upload operation.

#### IPFSError

```typescript
class IPFSError extends Error {
  code: IPFSErrorCode;
  originalError?: Error;
  
  constructor(
    message: string,
    code: IPFSErrorCode,
    originalError?: Error
  );
}
```

**Purpose**: Custom error class for IPFS operations.

#### IPFSErrorCode

```typescript
enum IPFSErrorCode {
  INIT_FAILED = 'INIT_FAILED',
  UPLOAD_FAILED = 'UPLOAD_FAILED',
  FETCH_FAILED = 'FETCH_FAILED',
  PARSE_FAILED = 'PARSE_FAILED',
  NOT_INITIALIZED = 'NOT_INITIALIZED',
  SPACE_REGISTRATION_FAILED = 'SPACE_REGISTRATION_FAILED'
}
```

**Purpose**: Error codes for IPFS operations.

### Model Types

#### Bottle

```typescript
interface Bottle extends ContractBottle, IPFSBottle {}
```

**Purpose**: Complete bottle data combining contract and IPFS layers.

**Properties**: All properties from `ContractBottle` + `IPFSBottle`.

#### Comment

```typescript
interface Comment extends ContractComment, IPFSComment {}
```

**Purpose**: Complete comment data combining contract and IPFS layers.

**Properties**: All properties from `ContractComment` + `IPFSComment`.

### User Types

#### User

```typescript
interface User {
  id: string;
  address: string;      // Ethereum wallet address
  displayName?: string;
  createdAt: Date;
}
```

#### UserLimits

```typescript
interface UserLimits {
  maxBottles: number;
  maxComments: number;
  maxLikes: number;
}
```

#### UserLike

```typescript
interface UserLike {
  userId: string;
  bottleId: number;
  timestamp: Date;
}
```

#### UserSession

```typescript
interface UserSession {
  user: User;
  limits: UserLimits;
  likedBottles: number[];
}
```

#### AuthState

```typescript
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}
```

## Architecture Pattern

Forever Message uses a **layered data architecture**:

```
┌─────────────────────────────────────┐
│  Application Layer (React)          │
│  Uses: Bottle, Comment, User        │
└──────────────┬──────────────────────┘
               │
    ┌──────────┴──────────┐
    │                     │
┌───▼──────────────┐  ┌──▼────────────────┐
│ Contract Layer   │  │  IPFS Layer       │
│ ContractBottle   │  │  IPFSBottle       │
│ ContractComment  │  │  IPFSComment      │
└──────────────────┘  └───────────────────┘
```

### Why This Separation?

1. **Gas Efficiency**: Only references stored on-chain, content in IPFS
2. **Type Safety**: Each layer has specific types
3. **Flexibility**: Can query contract or IPFS independently
4. **Testability**: Mock individual layers easily

## Development

```bash
yarn install
yarn build
yarn clean
```

## File Organization

| File | Purpose | Exports |
|------|---------|---------|
| `contract.ts` | Blockchain types | `ContractBottle`, `RawContractBottle`, `ContractComment`, `RawContractComment` |
| `ipfs.ts` | IPFS types | `IPFSBottle`, `IPFSComment`, `UploadResult`, `IPFSError`, `IPFSErrorCode` |
| `model.ts` | Combined types | `Bottle`, `Comment` |
| `user.ts` | User types | `User`, `UserLimits`, `UserLike`, `UserSession`, `AuthState` |
| `index.ts` | Re-exports | All types |

## Best Practices

### Type Guards

```typescript
function isIPFSBottle(item: IPFSItem): item is IPFSBottle {
  return item.type === 'bottle';
}

function isIPFSComment(item: IPFSItem): item is IPFSComment {
  return item.type === 'comment';
}
```

### Error Handling

```typescript
import { IPFSError, IPFSErrorCode } from '@loscolmebrothers/forever-message-types';

try {
  await ipfsService.uploadBottle(message, userId);
} catch (error) {
  if (error instanceof IPFSError) {
    switch (error.code) {
      case IPFSErrorCode.INIT_FAILED:
        console.error('Service not initialized');
        break;
      case IPFSErrorCode.UPLOAD_FAILED:
        console.error('Upload failed:', error.originalError);
        break;
    }
  }
}
```

### Type Conversion

```typescript
function convertRawBottle(raw: RawContractBottle): ContractBottle {
  return {
    id: Number(raw.id),
    ipfsHash: raw.ipfsHash,
    createdAt: new Date(Number(raw.createdAt) * 1000),
    expiresAt: new Date(Number(raw.expiresAt) * 1000),
    creator: raw.creator,
    isForever: raw.isForever,
    exists: raw.exists
  };
}
```

## Version History

### 3.0.0 (Current)
- Multi-user support
- Added `creator` field to `ContractBottle` and `RawContractBottle`
- Added `commenter` field to `ContractComment` and `RawContractComment`
- Updated architecture for custodial and web3 wallets

### 2.1.0
- Added engagement tracking (`likeCount`, `commentCount`)
- Added user types

### 2.0.0
- Initial IPFS integration
- Contract + IPFS type separation

## License

MIT
