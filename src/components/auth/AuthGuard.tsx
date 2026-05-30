"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useHasMounted } from "@/hooks/useHasMounted";
import { AuthLoadingScreen } from "@/components/auth/AuthLoadingScreen";
import { FirebaseSetupScreen } from "@/components/auth/FirebaseSetupScreen";

interface AuthGuardProps {
  children: ReactNode;
}

/**
 * Protects dashboard routes by redirecting unauthenticated users to /login.
 * Preserves the intended destination in a `redirect` query param.
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const hasMounted = useHasMounted();
  const { user, loading, firebaseReady } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!hasMounted || loading || !firebaseReady || user) return;

    const redirect = encodeURIComponent(pathname || "/");
    router.replace(`/login?redirect=${redirect}`);
  }, [hasMounted, loading, firebaseReady, user, router, pathname]);

  if (!hasMounted || loading) {
    return <AuthLoadingScreen />;
  }

  if (!firebaseReady) {
    return <FirebaseSetupScreen />;
  }

  if (!user) {
    return <AuthLoadingScreen />;
  }

  return <>{children}</>;
}
