import fc from "fast-check";
import { isSorted, prop } from "./helpers";

describe("Array.filter", () => {
  prop(
    "xs.filter(f).filter(f) = xs.filter(f)",
    fc.property(fc.array(fc.float()), fc.func(fc.boolean()), (arr, f) => {
      expect(arr.filter((x) => f(x)).filter((x) => f(x))).toEqual(
        arr.filter((x) => f(x))
      );
    })
  );
  prop(
    "xs.filter(() => true) = xs",
    fc.property(fc.array(fc.anything()), (arr) => {
      expect(arr.filter(() => true)).toEqual(arr);
    })
  );

  prop(
    "xs.filter(() => false) = []",
    fc.property(fc.array(fc.anything()), (arr) => {
      expect(arr.filter(() => false)).toEqual([]);
    })
  );

  prop(
    "xs.filter(f) is subset of xs",
    fc.property(fc.array(fc.anything()), fc.func(fc.boolean()), (arr, f) => {
      expect(arr).toEqual(expect.arrayContaining(arr.filter((x) => f(x))));
    })
  );

  prop(
    "xs.filter(f) preserves ordering",
    fc.property(fc.array(fc.anything()), fc.func(fc.boolean()), (arr, f) => {
      const indexed = arr.map((val, idx) => ({ val, idx }));
      const filtered = indexed.filter((x) => f(x.val));
      expect(
        isSorted(
          filtered.map((x) => x.idx),
          (a: number, b: number): number => a - b
        )
      ).toEqual(true);
    })
  );
});
