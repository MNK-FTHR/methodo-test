function asyncAdd(a: number, b: number, callback: (sum: number) => void) {
  setTimeout(() => {
    callback(a + b);
  }, 1500);
}

const myFnWithPromise = (a: number, b: number): Promise<number> => {
  return new Promise((resolve, reject) => {
    asyncAdd(a, b, (sum) => {
      resolve(sum);
    });
  });
};

type T_AnyFn = (...args: any[]) => any;

// function promisify<CALLBACK extends (callback: T_AnyFn) => any>(
//   callback: CALLBACK
// ): () => ReturnType<CALLBACK>;
// function promisify<CALLBACK extends (a: any, callback: T_AnyFn) => any>(
//   callback: CALLBACK
// ): (a: any) => ReturnType<CALLBACK>;
// function promisify<CALLBACK extends (a: any, b: any, callback: T_AnyFn) => any>(
//   callback: CALLBACK
// ): (a: any, b: any) => ReturnType<CALLBACK>;
// function promisify<
//   CALLBACK extends (a: any, b: any, c: any, callback: T_AnyFn) => any
// >(callback: CALLBACK): (a: any, b: any, c: any) => ReturnType<CALLBACK>;

/**
 * Transforme FN en fonction avec Promise au lieu de callback.
 */
type T_Promisify<FN extends T_AnyFn> = (
  // Prend en paramètre les arguments de la fonction sans le callback en dernier argument
  ...args: Parameters<FN> extends [...infer Args, any] ? Args : never
) => Promise<
  // Renvoie une Promise renvoyant les arguments donnés au callback
  Parameters<FN> extends [...any[], (...args: infer CALLBACK_ARGS) => any]
    ? CALLBACK_ARGS
    : never
>;

/**
 *
 * @param fnWithCallback Fonction à transformer
 *
 * @returns une fonction appelable prenant les même paramètres que la fonction originale
 * mais renvoyant une Promise composée des arguments du callback.
 *
 * @example
 * const fnCallback = (callback: (nb: number)) => {}
 * const fnPromise = promisify(fnCallback); // () => Promise<[nb: number]>
 *
 * const fnCallback = (arg: boolean, callback: (result: string)) => {}
 * const fnPromise = promisify(fnCallback); // (arg: boolean) => Promise<[result: string]>
 *
 * const fnCallback = (arg: boolean, callback: (a: string, b: number)) => {}
 * const fnPromise = promisify(fnCallback); // (arg: boolean) => Promise<[a: string, b:number]>
 *
 */
function promisify<FN_WITH_CALLBACK extends T_AnyFn>(
  fnWithCallback: FN_WITH_CALLBACK
): T_Promisify<FN_WITH_CALLBACK> {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fnWithCallback(...args, (...results: any[]) => {
        resolve(results as any);
      });
    });
  };
}

(async () => {
  // AVANT
  asyncAdd(1, 2, (sum) => {
    console.log("got callback", sum);
  });

  // APRES
  let sum = await myFnWithPromise(2, 3);
  console.log("got promise", sum);

  // APRES 2
  const asyncAddPromise = promisify(asyncAdd);
  let [mus] = await asyncAddPromise(3, 4);
  console.log("got promise 2", mus);
})();
