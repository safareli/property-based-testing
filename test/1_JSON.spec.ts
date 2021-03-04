import fc from "fast-check";
import { prop } from "./helpers";

describe("JSON", () => {
  prop(
    "JSON.stringify(JSON.parse(x)) == x",
    fc.property(fc.json(), (x) => {
      expect(JSON.stringify(JSON.parse(x))).toEqual(x);
    })
  );

  prop(
    "JSON.parse(JSON.stringify(x)) == x",
    fc.property(fc.jsonObject(), (x) => {
      const reParsed = JSON.parse(JSON.stringify(x));
      expect(JSON.parse(JSON.stringify(reParsed))).toEqual(reParsed);
    })
  );
});
