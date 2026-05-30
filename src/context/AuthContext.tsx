"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { getFirebaseAuth } from "@/firebase/auth";
import { isFirebaseConfigured } from "@/firebase/config";
import { useHasMounted } from "@/hooks/useHasMounted";
import {
  loginWithEmail,
  logoutUser,
  registerWithEmail,
} from "@/services/authService";
import { getUserProfile } from "@/services/userService";
import type { AuthContextValue, LoginInput, RegisterInput } from "@/types/auth";
import type { FirestoreUser } from "@/types/user";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const FIREBASE_SETUP_MESSAGE =
  "Firebase is not configured. Add credentials to .env.local and restart npm run dev.";

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provides Firebase auth state and actions to the entire app.
 * Waits for client mount before reading env to avoid hydration mismatches.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const hasMounted = useHasMounted();
  const [firebaseReady, setFirebaseReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<FirestoreUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Resolve Firebase config only on the client after mount.
  useEffect(() => {
    if (!hasMounted) return;

    const ready = isFirebaseConfigured();
    setFirebaseReady(ready);

    if (!ready) {
      setLoading(false);
    }
  }, [hasMounted]);

  useEffect(() => {
    if (!hasMounted || !firebaseReady) return;

    setLoading(true);
    const auth = getFirebaseAuth();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (!firebaseUser) {
        setUserProfile(null);
        setLoading(false);
        return;
      }

      try {
        const profile = await getUserProfile(firebaseUser.uid);
        setUserProfile(profile);
      } catch {
        setUserProfile(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [hasMounted, firebaseReady]);

  const login = useCallback(
    async (input: LoginInput) => {
      if (!firebaseReady) {
        throw new Error(FIREBASE_SETUP_MESSAGE);
      }
      await loginWithEmail(input);
    },
    [firebaseReady]
  );

  const register = useCallback(
    async (input: RegisterInput) => {
      if (!firebaseReady) {
        throw new Error(FIREBASE_SETUP_MESSAGE);
      }
      await registerWithEmail(input);
    },
    [firebaseReady]
  );

  const logout = useCallback(async () => {
    if (!firebaseReady) {
      throw new Error(FIREBASE_SETUP_MESSAGE);
    }
    await logoutUser();
  }, [firebaseReady]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      userProfile,
      loading: !hasMounted || loading,
      firebaseReady: hasMounted && firebaseReady,
      login,
      register,
      logout,
    }),
    [user, userProfile, hasMounted, loading, firebaseReady, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/** Access auth state and actions. Must be used within AuthProvider. */
export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
