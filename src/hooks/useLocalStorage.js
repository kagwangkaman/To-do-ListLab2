import { useCallback, useEffect, useState } from "react";

/**
 * State that mirrors itself into localStorage so tasks survive a page reload.
 *
 * Reads happen once on mount (lazy initialiser). Writes are wrapped in a
 * try/catch because localStorage throws in private browsing and when the
 * quota is full; in that case the app keeps working with in-memory state.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored === null) return initialValue;
      return JSON.parse(stored);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage is unavailable or full. The app still works without it.
    }
  }, [key, value]);

  const reset = useCallback(() => setValue(initialValue), [initialValue]);

  return [value, setValue, reset];
}
