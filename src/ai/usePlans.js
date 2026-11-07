import { useCallback, useEffect, useState } from "react";

export default function usePlans(fetchPlans) {
  const [plans, setPlans] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    setPlans([]);
    setStatus("loading");
    setError(null);
    fetchPlans()
      .then((data) => {
        setPlans(data);
        setStatus("ready");
      })
      .catch((err) => {
        console.error("Error loading plans", err);
      });
  }, [fetchPlans, attempt]);

  const reload = useCallback(() => setAttempt((n) => n + 1), []);

  return { status, plans, error, reload };
}
