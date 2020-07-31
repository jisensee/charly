open Jest;
open CommandTestUtils;
open StackItem;

describe("Discard [Item]", () => {
  let test = testCommandOk(Command.Discard);

  test("discards top item", [String("abc")], []);
});

describe("Duplicate [Item]", () => {
  let test = testCommandOk(Command.Duplicate);

  test(
    "duplicates top item",
    [String("abc")],
    [String("abc"), String("abc")],
  );
});
