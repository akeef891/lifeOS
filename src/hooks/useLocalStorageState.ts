"use client";

import { useEffect, useMemo, useState } from "react";

export function useLocalStorageState<T>(
  key: string,
  initialValue: T | (() => T)
) {
  const stableKey = useMemo(() => key, [key]);

  const [state, setState] = useState<T>(() => {
    if (typeof window === "undefined") {
      return typeof initialValue === "function"
        ? (initialValue as () => T)()
        : initialValue;
    }

    try {
      const raw = window.localStorage.getItem(stableKey);
      if (raw != null) return JSON.parse(raw) as T;
    } catch {
      // If parsing fails, fall back to the provided initial value.
    }

    return typeof initialValue === "function"
      ? (initialValue as () => T)()
      : initialValue;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(stableKey, JSON.stringify(state));
    } catch {
      // Ignore quota / privacy mode errors.
    }
  }, [stableKey, state]);

  return { state, setState } as const;
}

