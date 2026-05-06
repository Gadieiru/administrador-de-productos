import { useState, useEffect } from 'react';

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Si el usuario vuelve a escribir, cancelamos el timer anterior
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
