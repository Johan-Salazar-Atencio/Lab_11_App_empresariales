// TODO (useAgentRun) — la máquina de estados de la ejecución de un plan.
//
// Qué debe hacer:
//   useAgentRun(runAgent) devuelve:
//
//     { status, plan, result, error, start, approve, reject }
//
//   Estados de `status`:
//
//     idle ──start(plan)──▶ running ──ok, riesgo R1──▶ done
//                              │
//                              ├──ok, riesgo R2──▶ awaiting_approval ──approve()──▶ done
//                              │
//                              └──falla──▶ error
//
//     reject() en running o en awaiting_approval cancela y vuelve a idle.
//
//   · runAgent(plan, { signal }) devuelve una promesa del resultado (en la app, `runAgent` de src/lib/api.js).
//     `plan` tiene el formato de la S10: { id, op, risk, target, plan_hash, proposed_by }.
//   · start(plan): solo funciona desde idle, done o error. Con una ejecución en curso (running o
//     awaiting_approval) no hace nada. Pone status "running", guarda `plan` y llama a runAgent con una
//     AbortSignal propia.
//   · REGLA DE SEGURIDAD: un plan de riesgo R2 NUNCA va de running a done. Cuando runAgent termina bien,
//     un R2 pasa a "awaiting_approval" (con `result` ya guardado) y solo approve() lo lleva a done.
//     Un R1 va directo a done.
//   · approve(): solo hace algo en awaiting_approval. En cualquier otro estado no cambia nada.
//   · reject(): en running aborta la señal y descarta lo que llegue después; en awaiting_approval descarta
//     el resultado. En los dos casos vuelve a idle (plan null, result null). En otros estados no hace nada.
//   · Si runAgent se rechaza: status "error" y `error` con lo que falló.
//   · Al DESMONTAR: aborta la ejecución en curso y no toca el estado cuando su promesa termine.
//   · Hoy `runAgent` puede faltar (undefined) mientras el equipo conecta la app: el hook sigue en idle y
//     start() no hace nada. Cuando runAgent aparece en un dibujado posterior, el hook funciona.
//     Ojo: eso no autoriza a saltarse hooks. Las reglas de los hooks no se negocian.
//
// Pistas:
//   · Un solo useState con el objeto { status, plan, result, error } evita estados contradictorios.
//   · useRef para el AbortController de la ejecución actual y para leer el estado más reciente dentro de
//     start/approve/reject sin depender de un dibujado.
//   · Toda respuesta tardía se comprueba con `signal.aborted` antes de tocar el estado.
//   · Un useEffect sin dependencias ([]) cuya limpieza aborta el controlador: es lo que corre al desmontar.
//
// Hoy este hook no hace nada: se queda en "idle". Ejecuta `npm test -- useAgentRun` y mira qué falla.
export default function useAgentRun(runAgent) {
  return {
    status: "idle",
    plan: null,
    result: null,
    error: null,
    start: () => {},
    approve: () => {},
    reject: () => {},
  };
}
