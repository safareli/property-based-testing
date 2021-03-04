import fc from "fast-check";
import { isSorted, prop } from "./helpers";
describe("sort", () => {
  prop(
    "xs.sort(f) = xs.sort(f).sort(f)",
    fc.property(fc.array(fc.float()), fc.compareFunc(), (arr, f) => {
      expect(arr.sort(f).sort(f)).toEqual(arr.sort(f));
    })
  );

  prop(
    "set(xs.sort(f)) = set(xs)",
    fc.property(fc.array(fc.float()), fc.compareFunc(), (arr, f) => {
      expect(new Set(arr.sort(f))).toEqual(new Set(arr));
    })
  );

  prop(
    "isSorted(xs.sort(f),f)",
    fc.property(fc.array(fc.float()), fc.compareFunc(), (arr, f) => {
      expect(isSorted(arr.sort(f), f)).toEqual(true);
    })
  );
});
