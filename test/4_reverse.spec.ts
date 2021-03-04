import fc from "fast-check";
import { prop } from "./helpers";

describe("reverse", () => {
  prop(
    "reverse(reverse(xs)) = xs",
    fc.property(fc.array(fc.float()), (arr) => {
      expect(arr.reverse().reverse()).toEqual(arr.reverse());
    })
  );

  prop(
    "reverse([x]) = [x]",
    fc.property(fc.float(), (num) => {
      expect([num].reverse()).toEqual([num]);
    })
  );

  prop(
    "reverse(concat(xs, ys)) = concat(reverse(ys), reverse(xs)",
    fc.property(fc.array(fc.float()), fc.array(fc.float()), (xs, ys) => {
      expect(xs.concat(ys).reverse()).toEqual(
        ys.reverse().concat(xs.reverse())
      );
    })
  );
});
