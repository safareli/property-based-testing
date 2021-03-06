export type CacheService<T> = {
  set: (k: string, v: T) => Promise<void>;
  get: (k: string) => Promise<T | undefined>;
  delete: (k: string) => Promise<void>;
  size: () => Promise<number>;
};

export const mkCache = <T>(): CacheService<T> => {
  const dict: Record<string, T> = {};
  return {
    size: () =>
      new Promise<number>((resolve) => {
        setTimeout(() => {
          resolve(Object.keys(dict).length);
        }, 1);
      }),
    set: (k: string, v: T) =>
      new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          dict[k] = v;
          resolve();
        }, 1);
      }),
    get: (k: string) =>
      new Promise<T>((resolve, reject) => {
        setTimeout(() => {
          const val = dict[k];
          if (
            // BUG 🐞 don't return value
            Object.keys(dict).length > 4 ||
            val === undefined
          ) {
            reject(new Error(`key: ${k} was not in cache`));
            return;
          }
          resolve(val);
        }, 1);
      }),
    delete: (k: string) =>
      new Promise<void>((resolve, reject) => {
        delete dict[k];
        setTimeout(() => {
          resolve();
        }, 1);
      }),
  };
};
