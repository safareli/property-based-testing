import fc from "fast-check";
import { prop } from "./helpers";

describe("split/join", () => {
  prop(
    "a.split(b).join(b) = a",
    fc.property(fc.string(), fc.string(), (a, b) => {
      expect(a.split(b).join(b)).toEqual(a);
    })
  );

  prop(
    "(a + b + c).split(b) = [a, c]",
    fc.property(
      fc
        .tuple(fc.string(), fc.string(), fc.string())
        .filter(([a, b, c]) => a.indexOf(b) === -1 && c.indexOf(b) === -1),
      ([a, b, c]) => {
        expect((a + b + c).split(b)).toEqual([a, c]);
      }
    )
  );

  prop(
    "arr.join(s).split(s) = arr",
    fc.property(
      fc.string().chain((s) =>
        fc.tuple(
          fc
            .array(fc.string(), { minLength: 1 })
            .map((arr) => arr.filter((a) => a.indexOf(s) === -1)),
          fc.constant(s)
        )
      ),
      ([arr, s]) => {
        expect(arr.join(s).split(s)).toEqual(arr);
      }
    )
  );
});
