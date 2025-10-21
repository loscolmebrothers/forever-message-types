# @loscolmebrothers/forever-message-types

Shared TypeScript types for the Forever Message ecosystem.

## Version 1.1.0 - Major Refactoring

This version introduces a clearer type organization with layer-based naming conventions.

## Structure

```
src/
├── contract.ts    # Smart contract types (ContractBottle, ContractComment)
├── ipfs.ts        # IPFS storage types (IPFSBottle, IPFSComment)
├── model.ts       # Combined models for UI (Bottle, Comment)
├── user.ts        # User and authentication types
└── index.ts       # Main exports
```

## Installation

```bash
yarn add @loscolmebrothers/forever-message-types
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
const bottle: ContractBottle = convertRawBottle(rawBottle);
```

### IPFS Layer Types

For IPFS item storage and retrieval:

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
```

### Model Layer Types

For React UI and combined data:

```typescript
import {
  Bottle,
  Comment
} from '@loscolmebrothers/forever-message-types';

// Combine contract + IPFS data for UI
const bottle: Bottle = {
  ...contractBottle,  // id, ipfsHash, createdAt, expiresAt, likeCount, etc.
  ...ipfsData         // message, userId, type, timestamp
};

// Now you have everything for rendering
<BottleCard
  id={bottle.id}
  message={bottle.message}
  likes={bottle.likeCount}
  createdAt={bottle.createdAt}
/>
```

### User Types

For authentication and session management:

```typescript
import {
  User,
  UserLimits,
  UserSession,
  AuthState
} from '@loscolmebrothers/forever-message-types';

const session: UserSession = {
  user: currentUser,
  limits: userLimits,
  likedBottles: [1, 5, 8]
};
```

## Type Naming Convention

| Type | Purpose | Contains |
|------|---------|----------|
| `ContractBottle` | Blockchain data | id, ipfsHash, likes, comments, dates |
| `IPFSBottle` | IPFS storage | message, userId, timestamp |
| `Bottle` | Full model for UI | ContractBottle + IPFSBottle |

## Key Properties

- **`message`** (formerly `content`) - The actual text content of bottles and comments
- All dates from contracts are converted to JavaScript `Date` objects
- All bigints from contracts are converted to `number` for easier use

## Migration from 1.0.x

### Type Renames

- `BottleData` → `IPFSBottle`
- `CommentData` → `IPFSComment`
- `IPFSData` → `IPFSItem`
- `Bottle` → `ContractBottle` (for contract data only)
- `Comment` → `ContractComment` (for contract data only)
- `BottleWithMessage` → `Bottle` (now the main model)
- `CommentWithMessage` → `Comment` (now the main model)

### Property Renames

- `.content` → `.message` (in all types)

### Import Changes

```typescript
// Before
import { BottleData, Bottle } from '@loscolmebrothers/forever-message-types';

// After
import { IPFSBottle, ContractBottle, Bottle } from '@loscolmebrothers/forever-message-types';
```

## Constants

Platform constants (`LIKES_THRESHOLD`, `COMMENTS_THRESHOLD`, `EXPIRATION_DAYS`, etc.) are **not** included in this package.

**Single source of truth:** The deployed smart contract

Read constants at runtime from the deployed contract using:
```typescript
const likesThreshold = await contract.LIKES_THRESHOLD();
const commentsThreshold = await contract.COMMENTS_THRESHOLD();
```

## License

MIT
