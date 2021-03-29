import fc from "fast-check";
import { CacheService, mkCache } from "../src/cache_0";

type Model<T> = Map<string, T>;

type ArbCommand<T> = fc.AsyncCommand<Model<T>, CacheService<T>>;

const setCommand = <T>(key: string, value: T): ArbCommand<T> => ({
  toString: () => `Set(${JSON.stringify(key)}, ${JSON.stringify(value)})`,
  check: () => true,
  run: async (m: Model<T>, r: CacheService<T>) => {
    await r.set(key, value);
    m.set(key, value);
  },
});

const getCommand = <T>(key: string): ArbCommand<T> => ({
  toString: () => `Get(${JSON.stringify(key)})`,
  check: (m: Readonly<Model<T>>): boolean => m.has(key),
  run: async (m: Model<T>, r: CacheService<T>) => {
    expect(await r.get(key)).toEqual(m.get(key));
  },
});

const deleteCommand = <T>(key: string): ArbCommand<T> => ({
  toString: () => `Delete(${JSON.stringify(key)})`,
  check: (m: Readonly<Model<T>>): boolean => m.has(key),
  run: async (m: Model<T>, r: CacheService<T>) => {
    await r.delete(key);
    m.delete(key);
  },
});

const sizeCommand = <T>(): ArbCommand<T> => ({
  toString: () => `Size`,
  check: (): boolean => true,
  run: async (m: Model<T>, r: CacheService<T>) => {
    expect(await r.size()).toEqual(m.size);
  },
});

describe("Cache", () => {
  it("works", async () => {
    jest.setTimeout(100000);

    const genKey = fc.stringOf(fc.base64());
    await fc.assert(
      fc.asyncProperty(
        fc.commands(
          [
            fc.tuple(genKey, fc.integer()).map(([k, v]) => setCommand(k, v)),
            genKey.map((k) => getCommand<number>(k)),
            genKey.map((k) => deleteCommand<number>(k)),
            fc.constant(sizeCommand<number>()),
          ],
          {
            maxCommands: 100,
          }
        ),
        (commands) =>
          fc.asyncModelRun(
            () => ({
              model: new Map<string, number>(),
              real: mkCache<number>(),
            }),
            commands
          )
      ),
      {
        verbose: true,
      }
    );
  });
});
