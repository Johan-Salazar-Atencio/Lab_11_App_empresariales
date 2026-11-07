import { useCallback, useEffect, useState } from "react";

export default function usePlans(fetchPlans) {
  const [plans, setPlans] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setPlans([]);
    setStatus("loading");
    setError(null);
    fetchPlans()
      .then((data) => {
        if (cancelled) return;
        setPlans(data);
        setStatus("ready");
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err);
        setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [fetchPlans, attempt]);

  const reload = useCallback(() => setAttempt((n) => n + 1), []);

  return { status, plans, error, reload };
}
