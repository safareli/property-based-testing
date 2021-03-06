import fc from "fast-check";
import { prop } from "./helpers";
describe("Array.map", () => {
  prop(
    "xs.map(x => x) = xs",
    fc.property(fc.array(fc.anything()), (arr) => {
      expect(arr.map((x) => x)).toEqual(arr);
    })
  );

  prop(
    "arr.map(f).map(g) = arr.map(x => g(f(x)))",
    fc.property(
      fc.array(fc.anything()),
      fc.func(fc.anything()),
      fc.func(fc.anything()),
      (arr, f, g) => {
        expect(arr.map((x) => f(x)).map((y) => g(y))).toEqual(
          arr.map((x) => g(f(x)))
        );
      }
    )
  );
});
