import { Suspense } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";
import { AuthLoadingScreen } from "@/components/auth/AuthLoadingScreen";

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to access your LifeOS dashboard."
    >
      <Suspense fallback={<AuthLoadingScreen />}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
