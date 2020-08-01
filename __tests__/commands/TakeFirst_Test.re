open StackItem;

let test = CommandTestUtils.testCommandOk("<");

Jest.describe("TakeFirst [Int, String]", () => {
  test(
    "takes the first A chars from B",
    [Int(2), String("abc")],
    [String("ab")],
  );

  test(
    "takes the whole string if A > len(B)",
    [Int(5), String("abc")],
    [String("abc")],
  );

  test(
    "pushes an empty string if A is zero",
    [Int(0), String("abc")],
    [String("")],
  );
});
