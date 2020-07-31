open Jest;
open CommandTestUtils;
open StackItem;

describe("Discard [Item]", () => {
  let test = testCommandOk(";");

  test("discards top item", [String("abc")], []);
});

describe("Duplicate [Item]", () => {
  let test = testCommandOk("_");

  test(
    "duplicates top item",
    [String("abc")],
    [String("abc"), String("abc")],
  );
});

describe("Swap [Item, Item]", () => {
  let test = testCommandOk("/");

  test("swaps the top two items", [Int(1), Int(2)], [Int(2), Int(1)]);
});

describe("Rotate [Item, Item, Item]", () => {
  let test = testCommandOk("@");

  test(
    "pushes C to the top and shifts A and B down",
    [Int(1), Int(2), Int(3)],
    [Int(3), Int(1), Int(2)],
  );
});
