"use client";

import type { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useHasMounted } from "@/hooks/useHasMounted";
import { AuthLoadingScreen } from "@/components/auth/AuthLoadingScreen";
import { FirebaseSetupScreen } from "@/components/auth/FirebaseSetupScreen";

interface FirebaseConfigGateProps {
  children: ReactNode;
}

/** Blocks auth-dependent UI until Firebase env variables are configured. */
export function FirebaseConfigGate({ children }: FirebaseConfigGateProps) {
  const hasMounted = useHasMounted();
  const { loading, firebaseReady } = useAuth();

  if (!hasMounted || loading) {
    return <AuthLoadingScreen />;
  }

  if (!firebaseReady) {
    return <FirebaseSetupScreen />;
  }

  return <>{children}</>;
}
