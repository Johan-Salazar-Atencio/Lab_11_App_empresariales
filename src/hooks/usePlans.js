// TODO (usePlans) — carga los planes del agente con los tres estados de una petición.
//
// Qué debe hacer:
//   usePlans(fetchPlans) recibe una función que devuelve una promesa de planes (en la app es
//   `fetchPlans` de src/lib/api.js, que simula la red) y devuelve:
//
//     { status, plans, error, reload }
//
//   · status: "loading" | "ready" | "error".
//   · plans:  [] mientras carga y si falla; el arreglo recibido cuando llega bien.
//   · error:  null salvo en "error", donde es el error con el que falló la promesa.
//   · reload(): vuelve a pedir los planes. El estado vuelve a "loading" (plans [] y error null).
//
// Reglas:
//   1. Pide los planes al montar y cada vez que cambie `fetchPlans` o se llame a reload().
//      Quien llama pasa una función ESTABLE (no una nueva en cada dibujado), si no el efecto no terminaría nunca.
//   2. Resuelve los TRES estados: si la promesa se rechaza, el estado es "error" (no se queda en "loading").
//   3. IGNORA LA RESPUESTA VIEJA: si el efecto se repitió (reload) o el componente se desmontó antes de que
//      llegue una respuesta, esa respuesta no puede tocar el estado. Una carrera de peticiones es un error
//      de verdad: la respuesta lenta de antes pisaría a la nueva.
//
// Pistas:
//   · useState para el estado; un segundo useState (un contador) para forzar la repetición en reload().
//   · useEffect con la dependencia correcta. Dentro: `let cancelled = false;`, pide los datos, y en los
//     dos caminos (.then ok y error) mira `if (!cancelled)` antes de guardar. La LIMPIEZA pone cancelled = true.
//   · useCallback para que reload tenga siempre la misma identidad.
//
// Hoy este hook se queda en "loading" para siempre y nunca pide nada: por eso fallan sus pruebas.
// Ejecuta `npm test -- usePlans` y mira cuáles.
export default function usePlans(fetchPlans) {
  return { status: "loading", plans: [], error: null, reload: () => {} };
}
