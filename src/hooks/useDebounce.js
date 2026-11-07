// TODO (useDebounce) — escribe tu primer hook propio.
//
// Qué debe hacer:
//   useDebounce(value, delay) devuelve el valor "tranquilo": el último `value` que lleva `delay` ms sin cambiar.
//
//   1. En el primer dibujado devuelve `value` tal cual (nada de esperar para empezar).
//   2. Cuando `value` cambia, el valor devuelto sigue siendo el anterior hasta que pasan `delay` ms sin otro
//      cambio. Si llega otro cambio antes, el temporizador anterior se CANCELA y se arranca uno nuevo:
//      los valores intermedios no se devuelven nunca.
//   3. Si cambia `delay`, se vuelve a empezar a contar.
//   4. Al desmontar el componente no puede quedar ningún temporizador vivo.
//
// Pistas:
//   · El valor devuelto es un ESTADO (useState inicializado con `value`).
//   · setTimeout/clearTimeout van en un useEffect cuyas dependencias son [value, delay].
//   · La función que devuelve el useEffect es la LIMPIEZA: React la ejecuta antes de repetir el efecto
//     y al desmontar. Ahí se cancela el temporizador.
//
// Hoy este hook devuelve el valor sin esperar nada: por eso fallan sus pruebas.
// Ejecuta `npm test -- useDebounce` y mira cuáles.
export default function useDebounce(value, delay) {
  return value;
}
