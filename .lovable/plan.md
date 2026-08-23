---
name: Visual text update for invisible marker
description: Update the span element in the index route to display the literal text "\u2063" instead of the escaped string.
type: feature
---

## Technical Details

1.  **File**: `src/routes/index.tsx`
2.  **Change**: Update the content of the `<span>` element from `{"\\u2063"}` to `{"\u2063"}` (the invisible separator character).

## Steps

1.  Modify `src/routes/index.tsx` to replace the literal text `\u2063` with the actual character `\u2063`.
