import { useEffect, useState } from "react";

// Returns the "calm" value: the last `value` that has stayed unchanged for `delay` ms.
// The first render returns `value` as it is. Every change cancels the previous timer
// (the cleanup function), so the intermediate values are never returned, and no timer
// stays alive after the component unmounts.
export default function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
