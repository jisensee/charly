open Jest;
open CommandTestUtils;
open StackItem;

let test = testCommandOk("h");

describe("Head [String]", () => {
  test("gets the first char of A", [String("abc")], [String("a")]);
  test("does nothing with empty string", [String("")], []);
});

describe("Head [List]", () => {
  test(
    "gets the first string of A",
    [List(["abc", "def"])],
    [String("abc")],
  );
  test("does nothing with empty list", [List([])], []);
});

describe("Head [Int]", () => {
  test("gets the first digit of A", [Int(12)], [Int(1)])
});
