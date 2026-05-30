"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

/** Registration form that creates Firebase Auth + Firestore user profile. */
export function RegisterForm() {
  const { register } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const passwordsMatch = password === confirmPassword;
  const canSubmit =
    name.trim().length > 0 &&
    email.trim().includes("@") &&
    password.length >= 6 &&
    passwordsMatch;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);

    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        password,
      });
      showToast({
        title: "Account created",
        description: "Welcome to LifeOS!",
        variant: "success",
      });
      router.replace("/");
    } catch (error) {
      showToast({
        title: "Registration failed",
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
        <span className="text-xs font-medium text-muted">Full name</span>
        <input
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Alex Morgan"
          className={inputClassName}
          required
        />
      </label>

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
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="At least 6 characters"
          className={inputClassName}
          required
          minLength={6}
        />
      </label>

      <label className="block">
        <span className="text-xs font-medium text-muted">Confirm password</span>
        <input
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          placeholder="Repeat your password"
          className={inputClassName}
          required
          minLength={6}
        />
        {!passwordsMatch && confirmPassword.length > 0 ? (
          <p className="mt-1.5 text-xs text-rose-400">Passwords do not match.</p>
        ) : null}
      </label>

      <Button type="submit" className="h-11 w-full sm:h-12" disabled={!canSubmit || submitting}>
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Creating account…
          </>
        ) : (
          "Create account"
        )}
      </Button>

      <p className="text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-violet-300 hover:text-violet-200">
          Sign in
        </Link>
      </p>
    </form>
  );
}
