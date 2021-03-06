import fc from "fast-check";
import { isSorted, sort, prop } from "./helpers";

describe("sort", () => {
  prop(
    "xs.sort(f) = xs.sort(f).sort(f)",
    fc.property(fc.array(fc.anything()), fc.compareFunc(), (arr, f) => {
      expect(sort(sort(arr, f), f)).toEqual(sort(arr, f));
    })
  );

  prop(
    "set(xs.sort(f)) = set(xs)",
    fc.property(fc.array(fc.anything()), fc.compareFunc(), (arr, f) => {
      expect(new Set(sort(arr, f))).toEqual(new Set(arr));
    })
  );

  prop(
    "isSorted(xs.sort(f),f)",
    fc.property(fc.array(fc.anything()), fc.compareFunc(), (arr, f) => {
      expect(isSorted(sort(arr, f), f)).toEqual(true);
    })
  );
});
