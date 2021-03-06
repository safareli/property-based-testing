/* eslint-disable @typescript-eslint/no-non-null-assertion */
import fc from "fast-check";

import { drop, take } from "lodash";
const sample = (
  arb: fc.Arbitrary<unknown>,
  seed?: number,
  numRuns: number = 20
) => console.log(fc.sample(arb, { seed, numRuns }));

const isSorted = <T>(arr: T[], compare: (a: T, b: T) => number) =>
  arr.every((val, i) => (i === 0 ? true : compare(arr[i - 1]!, val) <= 0));

const sort = <T>(
  arr: Array<T>,
  compareFn?: ((a: T, b: T) => number) | undefined
): T[] => {
  return [...arr].sort(compareFn);
};

const reverse = <T>(arr: T[]): T[] => {
  return [...arr].reverse();
};

const prop = <Ts>(
  name: string,
  property: fc.IProperty<Ts>,
  params?: fc.Parameters<Ts>
) => it(name, () => fc.assert(property, params));

export { drop, reverse, sort, take, sample, isSorted, prop };
