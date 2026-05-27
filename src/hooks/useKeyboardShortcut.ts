"use client";

import { useEffect } from "react";

interface UseKeyboardShortcutOptions {
  enabled?: boolean;
}

export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  options: UseKeyboardShortcutOptions = {}
) {
  const { enabled = true } = options;

  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (event: KeyboardEvent) => {
      const isMod = event.metaKey || event.ctrlKey;
      if (key === "mod+k" && isMod && event.key.toLowerCase() === "k") {
        event.preventDefault();
        callback();
      } else if (key === "escape" && event.key === "Escape") {
        callback();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [key, callback, enabled]);
}
