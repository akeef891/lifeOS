"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useHasMounted } from "@/hooks/useHasMounted";
import { AuthLoadingScreen } from "@/components/auth/AuthLoadingScreen";

interface GuestGuardProps {
  children: ReactNode;
}

/** Redirects authenticated users away from login/register pages to the dashboard. */
export function GuestGuard({ children }: GuestGuardProps) {
  const hasMounted = useHasMounted();
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!hasMounted || loading || !user) return;

    const redirect = searchParams.get("redirect");
    const destination =
      redirect && redirect.startsWith("/") && !redirect.startsWith("//")
        ? redirect
        : "/";

    router.replace(destination);
  }, [hasMounted, loading, user, router, searchParams]);

  if (!hasMounted || loading) {
    return <AuthLoadingScreen />;
  }

  if (user) {
    return <AuthLoadingScreen />;
  }

  return <>{children}</>;
}
