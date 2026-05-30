"use client";

import { useEffect, useState } from "react";
import { Copy, ExternalLink, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import {
  FIREBASE_ENV_KEYS,
  getMissingFirebaseEnvKeys,
  type FirebaseEnvKey,
} from "@/firebase/config";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useToast } from "@/hooks/useToast";

const ENV_TEMPLATE = FIREBASE_ENV_KEYS.map((key) => `${key}=your_value`).join("\n");

/** Shown when Firebase env variables are missing so the app does not crash. */
export function FirebaseSetupScreen() {
  const hasMounted = useHasMounted();
  const { showToast } = useToast();
  const [missingKeys, setMissingKeys] = useState<FirebaseEnvKey[]>([]);

  useEffect(() => {
    if (!hasMounted) return;
    setMissingKeys(getMissingFirebaseEnvKeys());
  }, [hasMounted]);

  async function copyEnvTemplate() {
    try {
      await navigator.clipboard.writeText(ENV_TEMPLATE);
      showToast({
        title: "Copied to clipboard",
        description: "Paste into .env.local in your project root.",
        variant: "success",
      });
    } catch {
      showToast({
        title: "Copy failed",
        description: "Select and copy the template manually.",
        variant: "error",
      });
    }
  }

  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center overflow-x-hidden bg-background px-4 py-8 sm:px-6 sm:py-12">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.18),_transparent_55%)]"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-xl"
      >
        <div className="mb-6 text-center sm:mb-8">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/30 bg-violet-500/15 sm:h-11 sm:w-11">
              <Sparkles className="h-4 w-4 text-violet-300 sm:h-5 sm:w-5" />
            </span>
            LifeOS
          </span>
          <h1 className="mt-5 text-xl font-semibold tracking-tight text-foreground sm:mt-6 sm:text-2xl">
            Firebase setup required
          </h1>
          <p className="mx-auto mt-2 max-w-md px-1 text-sm leading-relaxed text-muted sm:text-base">
            Add credentials to{" "}
            <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-violet-300">
              .env.local
            </code>{" "}
            with no quotes or commas, then restart{" "}
            <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-violet-300">
              npm run dev
            </code>
            .
          </p>
        </div>

        <GlassCard padding="lg" hover={false} className="space-y-5 sm:space-y-6">
          <ol className="list-decimal space-y-2.5 pl-5 text-sm leading-relaxed text-muted sm:space-y-3">
            <li>
              Open{" "}
              <a
                href="https://console.firebase.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-violet-300 transition-colors hover:text-violet-200"
              >
                Firebase Console
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
              </a>
            </li>
            <li>
              Add a <strong className="font-medium text-foreground">Web app</strong> and copy
              config values.
            </li>
            <li>
              Enable{" "}
              <strong className="font-medium text-foreground">
                Authentication → Email/Password
              </strong>
              .
            </li>
            <li>
              Create a <strong className="font-medium text-foreground">Firestore</strong>{" "}
              database.
            </li>
            <li>
              Use format: <code className="text-violet-300">KEY=value</code> (one per line).
            </li>
          </ol>

          {hasMounted && missingKeys.length > 0 ? (
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted">
                Missing variables ({missingKeys.length})
              </p>
              <ul className="mt-2 max-h-40 space-y-1 overflow-y-auto rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 text-xs text-rose-200 sm:text-sm">
                {missingKeys.map((key) => (
                  <li key={key} className="break-all font-mono">
                    {key}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <pre className="max-h-48 overflow-x-auto overflow-y-auto rounded-xl border border-white/[0.08] bg-black/40 p-3 text-[11px] leading-relaxed text-emerald-200 sm:p-4 sm:text-xs">
            {ENV_TEMPLATE}
          </pre>

          <Button type="button" className="h-11 w-full sm:h-12" onClick={copyEnvTemplate}>
            <Copy className="h-4 w-4" />
            Copy .env.local template
          </Button>
        </GlassCard>
      </motion.div>
    </div>
  );
}
