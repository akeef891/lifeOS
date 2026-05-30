"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { getAuthErrorMessage } from "@/utils/authErrors";
import { cn } from "@/lib/utils";

const inputClassName = cn(
  "mt-1.5 h-11 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 text-base text-foreground sm:h-12 sm:text-sm",
  "placeholder:text-muted/70 transition-[border-color,box-shadow] duration-200",
  "focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
);

/** Email/password login form with loading and toast feedback. */
export function LoginForm() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = email.trim().includes("@") && password.length >= 6;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);

    try {
      await login({ email: email.trim(), password });
      showToast({
        title: "Welcome back!",
        variant: "success",
      });

      const redirect = searchParams.get("redirect");
      const destination =
        redirect && redirect.startsWith("/") && !redirect.startsWith("//")
          ? redirect
          : "/";

      router.replace(destination);
    } catch (error) {
      showToast({
        title: "Sign in failed",
        description: getAuthErrorMessage(error),
        variant: "error",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label className="block">
        <span className="text-xs font-medium text-muted">Email</span>
        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className={inputClassName}
          required
        />
      </label>

      <label className="block">
        <span className="text-xs font-medium text-muted">Password</span>
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="••••••••"
          className={inputClassName}
          required
          minLength={6}
        />
      </label>

      <Button type="submit" className="h-11 w-full sm:h-12" disabled={!canSubmit || submitting}>
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Signing in…
          </>
        ) : (
          "Sign in"
        )}
      </Button>

      <p className="text-center text-sm text-muted">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-violet-300 hover:text-violet-200">
          Create one
        </Link>
      </p>
    </form>
  );
}
