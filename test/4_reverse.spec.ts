import fc from "fast-check";
import { prop, reverse } from "./helpers";

describe("reverse", () => {
  prop(
    "reverse(reverse(xs)) = xs",
    fc.property(fc.array(fc.anything()), (arr) => {
      expect(reverse(reverse(arr))).toEqual(arr);
    })
  );

  prop(
    "reverse([x]) = [x]",
    fc.property(fc.anything(), (a) => {
      expect(reverse([a])).toEqual([a]);
    })
  );

  prop(
    "reverse(concat(xs, ys)) = concat(reverse(ys), reverse(xs)",
    fc.property(fc.array(fc.anything()), fc.array(fc.anything()), (xs, ys) => {
      expect(reverse(xs.concat(ys))).toEqual(reverse(ys).concat(reverse(xs)));
    })
  );
});
