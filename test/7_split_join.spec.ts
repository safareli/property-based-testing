import fc from "fast-check";
import { drop, take } from "lodash";
import { prop } from "./helpers";

describe("take/drop", () => {
  prop(
    "drop(j,(take(j+i,xs)) = take(i, (drop(j, xs))",
    fc.property(
      fc.array(fc.float(), { minLength: 0, maxLength: 20 }),
      fc.integer(0, 25),
      fc.integer(0, 25),
      (xs, j, i) => {
        expect(drop(take(xs, j + i), j)).toEqual(take(drop(xs, j), i));
      }
    )
  );
});
