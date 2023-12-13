import { useState, useEffect } from 'react';

type LocalStorageState<T> = T | null;

export function useLocalStorage<T>(
  key: string,
  initialState: T
): [LocalStorageState<T>, (newState: T) => void] {
  const [state, setState] = useState<LocalStorageState<T>>(() => {
    const storedValue = window.localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue) as T;
    } else {
      return initialState;
    }
  });

  useEffect(() => {
    if (state !== null) {
      window.localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, setState];
}
