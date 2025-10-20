# @forever-message/types

Shared TypeScript types for the Forever Message ecosystem.

## Structure

```
src/
├── domain/     # Core business types (Bottle, Comment, User, constants)
├── api/        # API request/response types
├── ipfs/       # IPFS content types
└── index.ts    # Main exports
```

## Installation

```bash
yarn add @forever-message/types
```

## Usage

```typescript
import { 
  Bottle, 
  Comment, 
  User,
  LIKES_THRESHOLD,
  ApiResponse 
} from '@forever-message/types';
```

## Constants

Platform constants (`LIKES_THRESHOLD`, `COMMENTS_THRESHOLD`, `EXPIRATION_DAYS`, etc.) are **not** included in this package.

**Single source of truth:** The deployed smart contract at `@forever-message/contract`

Read constants at runtime from the deployed contract using:
```typescript
const likesThreshold = await contract.LIKES_THRESHOLD();
const commentsThreshold = await contract.COMMENTS_THRESHOLD();
```
