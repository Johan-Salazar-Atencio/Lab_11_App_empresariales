import { useEffect, useRef, useState } from "react";

export default function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setTimeout(() => {
      setDebounced(value);
    }, delay);
  }, [value, delay]);

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  return debounced;
}
