# Tasks & Notes — Firestore Migration

## Data path

```
users/{uid}/tasks/{taskId}
users/{uid}/notes/{noteId}
```

Each document includes `userId` matching the authenticated user for security rules.

## Migration strategy

1. **Deploy rules** — Copy `firestore.rules` to Firebase Console → Firestore → Rules → Publish.
2. **No automatic import** — Existing localStorage data (`lifeos.tasks.v1`, `lifeos.notes.v1`) is not migrated automatically.
3. **Optional manual import** — Users can re-create tasks/notes in the app; data will sync to Firestore per account.
4. **One-time script (optional)** — If you need bulk import, run a Node script with Admin SDK that reads local JSON and writes to `users/{uid}/tasks` and `users/{uid}/notes` with `userId` and `serverTimestamp()`.

## localStorage keys (legacy)

| Key | Status |
|-----|--------|
| `lifeos.tasks.v1` | Unused by app (safe to clear in browser) |
| `lifeos.notes.v1` | Unused by app (safe to clear in browser) |
| `lifeos.profile.v1` | Still used for local display preferences |
| `lifeos.notifications.v1` | Still used for notifications UI |

## Firestore indexes

If Firebase prompts for a composite index when ordering by `updatedAt`, create it from the console link in the error message.
