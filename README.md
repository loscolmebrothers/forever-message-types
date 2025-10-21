# @loscolmebrothers/forever-message-types

Shared TypeScript types for the Forever Message ecosystem.

## Overview

This package provides type definitions for the Forever Message project, organized into three layers:
- **Contract Layer**: Types for blockchain smart contract data
- **IPFS Layer**: Types for decentralized storage
- **Model Layer**: Combined types for application use

## Installation

```bash
yarn add @loscolmebrothers/forever-message-types
```

## Structure

```
src/
├── contract.ts    # Smart contract types (ContractBottle, ContractComment)
├── ipfs.ts        # IPFS storage types (IPFSBottle, IPFSComment)
├── model.ts       # Combined models for UI (Bottle, Comment)
├── user.ts        # User and authentication types
└── index.ts       # Main exports
```

## Usage

### Contract Layer Types

For interacting with the smart contract:

```typescript
import {
  ContractBottle,
  RawContractBottle,
  ContractComment,
  RawContractComment
} from '@loscolmebrothers/forever-message-types';

// Raw data from contract (bigint)
const rawBottle: RawContractBottle = await contract.getBottle(id);

// Converted data (numbers and Dates)
const bottle: ContractBottle = {
  id: Number(rawBottle.id),
  ipfsHash: rawBottle.ipfsHash,
  createdAt: new Date(Number(rawBottle.createdAt) * 1000),
  expiresAt: new Date(Number(rawBottle.expiresAt) * 1000),
  isForever: rawBottle.isForever,
  exists: rawBottle.exists
};
```

### IPFS Layer Types

For IPFS storage and retrieval:

```typescript
import {
  IPFSBottle,
  IPFSComment,
  IPFSItem,
  UploadResult,
  IPFSError,
  IPFSErrorCode
} from '@loscolmebrothers/forever-message-types';

// Upload to IPFS
const result: UploadResult = await ipfs.uploadBottle(message, userId);

// Retrieve from IPFS
const bottleData: IPFSBottle = await ipfs.getItem<IPFSBottle>(cid);
console.log(bottleData.message); // The actual message content

// Handle errors
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

For application UI with combined contract and IPFS data:

```typescript
import { Bottle, Comment } from '@loscolmebrothers/forever-message-types';

// Combine contract + IPFS data for your app
const bottle: Bottle = {
  // From contract
  id: contractBottle.id,
  ipfsHash: contractBottle.ipfsHash,
  createdAt: contractBottle.createdAt,
  expiresAt: contractBottle.expiresAt,
  isForever: contractBottle.isForever,
  exists: contractBottle.exists,
  
  // From IPFS
  message: ipfsData.message,
  userId: ipfsData.userId,
  type: ipfsData.type,
  timestamp: ipfsData.timestamp,
  likeCount: ipfsData.likeCount,
  commentCount: ipfsData.commentCount
};

// Render in your UI
<BottleCard
  id={bottle.id}
  message={bottle.message}
  likes={bottle.likeCount}
  comments={bottle.commentCount}
  createdAt={bottle.createdAt}
  isForever={bottle.isForever}
/>
```

### User Types

For authentication and user session management:

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

## Type Organization

### Contract Types
| Type | Purpose | Key Properties |
|------|---------|---------------|
| `ContractBottle` | Bottle data from blockchain | `id`, `ipfsHash`, `createdAt`, `expiresAt`, `isForever` |
| `RawContractBottle` | Raw contract data (bigints) | Same as above but with `bigint` types |
| `ContractComment` | Comment data from blockchain | `id`, `bottleId`, `ipfsHash`, `createdAt` |
| `RawContractComment` | Raw contract data (bigints) | Same as above but with `bigint` types |

### IPFS Types
| Type | Purpose | Key Properties |
|------|---------|---------------|
| `IPFSBottle` | Bottle content in IPFS | `message`, `userId`, `timestamp`, `likeCount`, `commentCount` |
| `IPFSComment` | Comment content in IPFS | `message`, `userId`, `bottleId`, `timestamp` |
| `IPFSItem` | Union of IPFSBottle and IPFSComment | - |
| `UploadResult` | Result of IPFS upload | `cid`, `size`, `url` |
| `IPFSError` | IPFS operation errors | `code`, `message`, `originalError` |
| `IPFSErrorCode` | Error codes enum | `INIT_FAILED`, `UPLOAD_FAILED`, `FETCH_FAILED`, etc. |

### Model Types
| Type | Purpose | Combines |
|------|---------|----------|
| `Bottle` | Complete bottle for UI | `ContractBottle` + `IPFSBottle` |
| `Comment` | Complete comment for UI | `ContractComment` + `IPFSComment` |

### User Types
| Type | Purpose | Key Properties |
|------|---------|---------------|
| `User` | User profile | `id`, `address`, `displayName` |
| `UserLimits` | User action limits | `maxBottles`, `maxComments`, `maxLikes` |
| `UserLike` | Like relationship | `userId`, `bottleId`, `timestamp` |
| `UserSession` | Active session | `user`, `limits`, `likedBottles` |
| `AuthState` | Auth status | `isAuthenticated`, `user`, `loading` |

## Architecture Pattern

Forever Message uses a layered architecture:

1. **Smart Contract** stores immutable references (IDs, IPFS hashes, timestamps)
2. **IPFS** stores the actual content (messages, metadata)
3. **Application** combines both layers for the user

This separation keeps blockchain costs low while maintaining decentralization.

## Error Handling

```typescript
import { IPFSError, IPFSErrorCode } from '@loscolmebrothers/forever-message-types';

try {
  await ipfsService.uploadBottle(message, userId);
} catch (error) {
  if (error instanceof IPFSError) {
    switch (error.code) {
      case IPFSErrorCode.INIT_FAILED:
        console.error('IPFS not initialized');
        break;
      case IPFSErrorCode.UPLOAD_FAILED:
        console.error('Upload failed:', error.originalError);
        break;
      case IPFSErrorCode.FETCH_FAILED:
        console.error('Fetch failed');
        break;
    }
  }
}
```

## License

MIT
