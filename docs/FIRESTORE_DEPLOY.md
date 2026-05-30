# Deploy Firestore rules (required for tasks & notes)

The **permission denied** error means Firebase Console is still using old rules that do not allow `users/{uid}/tasks` or `users/{uid}/notes`.

## Option A — Firebase Console (fastest)

1. Open [Firebase Console](https://console.firebase.google.com/) → your project **lifeos-ffb92**
2. **Firestore Database** → **Rules**
3. Replace all rules with the contents of `firestore.rules` in this repo
4. Click **Publish**

## Option B — Firebase CLI

```bash
npm install -g firebase-tools
firebase login
firebase use lifeos-ffb92
firebase deploy --only firestore:rules,firestore:indexes
```

## After publishing

1. Restart `npm run dev`
2. Sign in again
3. Create a task and a note — they should appear instantly

## Indexes

If you see an index error, click the link in the browser console or run:

```bash
firebase deploy --only firestore:indexes
```
