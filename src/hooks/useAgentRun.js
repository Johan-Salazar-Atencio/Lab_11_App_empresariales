import { useCallback, useEffect, useRef, useState } from "react";

const IDLE = { status: "idle", plan: null, result: null, error: null };

// State machine for running one plan:
//   idle -> running -> done (risk R1)
//                   -> awaiting_approval -> done (risk R2, only through approve())
//                   -> error
//   reject() in running or awaiting_approval goes back to idle.
// A single state object avoids contradictory states. The hooks are always called in the same order,
// at the top level: if runAgent is missing, start() simply does nothing.
export default function useAgentRun(runAgent) {
  const [run, setRun] = useState(IDLE);
  const latest = useRef(IDLE); // the freshest state, readable inside start/approve/reject
  const controller = useRef(null); // AbortController of the current run

  const update = useCallback((next) => {
    latest.current = next;
    setRun(next);
  }, []);

  const start = useCallback(
    (plan) => {
      if (!runAgent) return;
      const { status } = latest.current;
      if (status === "running" || status === "awaiting_approval") return;

      const current = new AbortController();
      controller.current = current;
      update({ status: "running", plan, result: null, error: null });

      runAgent(plan, { signal: current.signal }).then(
        (result) => {
          if (current.signal.aborted) return;
          // A destructive plan (R2) NEVER goes from running to done: it waits for approve().
          const status = plan.risk === "R2" ? "awaiting_approval" : "done";
          update({ status, plan, result, error: null });
        },
        (error) => {
          if (current.signal.aborted) return;
          update({ status: "error", plan, result: null, error });
        },
      );
    },
    [runAgent, update],
  );

  const approve = useCallback(() => {
    if (latest.current.status !== "awaiting_approval") return;
    update({ ...latest.current, status: "done" });
  }, [update]);

  const reject = useCallback(() => {
    const { status } = latest.current;
    if (status !== "running" && status !== "awaiting_approval") return;
    controller.current?.abort();
    update(IDLE);
  }, [update]);

  // Runs only when the component unmounts: abort whatever is still running.
  useEffect(() => () => controller.current?.abort(), []);

  return { ...run, start, approve, reject };
}
