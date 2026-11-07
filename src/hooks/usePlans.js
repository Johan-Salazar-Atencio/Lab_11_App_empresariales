import { useCallback, useEffect, useState } from "react";

// Loads the plans with the three states of a request: "loading", "ready" and "error".
// `fetchPlans` must be a stable function (the effect repeats when it changes).
// A late answer from an old request must never touch the state: the cleanup function marks
// that request as cancelled, so a slow response cannot overwrite the newer one.
export default function usePlans(fetchPlans) {
  const [state, setState] = useState({ status: "loading", plans: [], error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading", plans: [], error: null });

    fetchPlans().then(
      (plans) => {
        if (!cancelled) setState({ status: "ready", plans, error: null });
      },
      (error) => {
        if (!cancelled) setState({ status: "error", plans: [], error });
      },
    );

    return () => {
      cancelled = true;
    };
  }, [fetchPlans, attempt]);

  const reload = useCallback(() => setAttempt((n) => n + 1), []);

  return { ...state, reload };
}
