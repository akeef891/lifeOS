import { initializeApp, getApps, type FirebaseApp } from "firebase/app";

/** All public env keys required for the Firebase web SDK. */
export const FIREBASE_ENV_KEYS = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
] as const;

export type FirebaseEnvKey = (typeof FIREBASE_ENV_KEYS)[number];

/**
 * Static env access map — required so Next.js can inline NEXT_PUBLIC_* values
 * into the client bundle. Dynamic process.env[key] always reads as undefined
 * in the browser.
 */
const PUBLIC_ENV: Record<FirebaseEnvKey, string | undefined> = {
  NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function normalizeEnvValue(raw: string | undefined): string {
  if (!raw) return "";

  return raw
    .trim()
    .replace(/^["']|["']$/g, "")
    .replace(/,+$/, "")
    .trim();
}

/** Normalizes values from .env.local (trims spaces, quotes, trailing commas). */
export function readPublicEnv(key: FirebaseEnvKey): string {
  return normalizeEnvValue(PUBLIC_ENV[key]);
}

function buildFirebaseConfig() {
  return {
    apiKey: readPublicEnv("NEXT_PUBLIC_FIREBASE_API_KEY"),
    authDomain: readPublicEnv("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
    projectId: readPublicEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
    storageBucket: readPublicEnv("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: readPublicEnv("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
    appId: readPublicEnv("NEXT_PUBLIC_FIREBASE_APP_ID"),
  };
}

/** Returns env keys that are missing or empty after normalization. */
export function getMissingFirebaseEnvKeys(): FirebaseEnvKey[] {
  return FIREBASE_ENV_KEYS.filter((key) => !readPublicEnv(key));
}

/** True when every Firebase env variable is present. */
export function isFirebaseConfigured(): boolean {
  return getMissingFirebaseEnvKeys().length === 0;
}

let firebaseApp: FirebaseApp | null = null;

/**
 * Initializes Firebase once and returns the shared app instance.
 * Throws only when auth/firestore is used without a valid config.
 */
export function getFirebaseApp(): FirebaseApp {
  if (firebaseApp) return firebaseApp;

  const missing = getMissingFirebaseEnvKeys();
  if (missing.length > 0) {
    throw new Error(
      `Firebase is not configured. Add these to .env.local and restart the dev server: ${missing.join(", ")}`
    );
  }

  firebaseApp =
    getApps().length > 0 ? getApps()[0]! : initializeApp(buildFirebaseConfig());
  return firebaseApp;
}
