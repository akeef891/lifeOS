"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_EVENT = "lifeos:storage";

function readValue<T>(key: string, initialValue: T | (() => T)): T {
  if (typeof window === "undefined") {
    return typeof initialValue === "function"
      ? (initialValue as () => T)()
      : initialValue;
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (raw != null) return JSON.parse(raw) as T;
  } catch {
    // Fall back to initial value.
  }

  return typeof initialValue === "function"
    ? (initialValue as () => T)()
    : initialValue;
}

export function useLocalStorageState<T>(
  key: string,
  initialValue: T | (() => T)
) {
  const stableKey = useMemo(() => key, [key]);

  const [state, setStateInternal] = useState<T>(() =>
    readValue(stableKey, initialValue)
  );

  const setState = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStateInternal((prev) => {
        const next =
          typeof value === "function"
            ? (value as (prev: T) => T)(prev)
            : value;

        try {
          window.localStorage.setItem(stableKey, JSON.stringify(next));
          window.dispatchEvent(
            new CustomEvent(STORAGE_EVENT, {
              detail: { key: stableKey },
            })
          );
        } catch {
          // Ignore quota / privacy mode errors.
        }

        return next;
      });
    },
    [stableKey]
  );

  useEffect(() => {
    const syncFromStorage = (eventKey: string) => {
      if (eventKey !== stableKey) return;
      setStateInternal(readValue(stableKey, initialValue));
    };

    const onStorage = (event: StorageEvent) => {
      if (event.key === stableKey) syncFromStorage(stableKey);
    };

    const onCustom = (event: Event) => {
      const detail = (event as CustomEvent<{ key: string }>).detail;
      if (detail?.key) syncFromStorage(detail.key);
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener(STORAGE_EVENT, onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(STORAGE_EVENT, onCustom);
    };
  }, [stableKey, initialValue]);

  return { state, setState } as const;
}
