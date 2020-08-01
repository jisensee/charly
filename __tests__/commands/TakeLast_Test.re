open StackItem;

let test = CommandTestUtils.testCommandOk(">");

Jest.describe("TakeLast [Int, String]", () => {
  test(
    "takes the Last A chars from B",
    [Int(2), String("abc")],
    [String("bc")],
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
