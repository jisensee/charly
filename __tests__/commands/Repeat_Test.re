open Jest;
open CommandTestUtils;
open StackItem;

let test = testCommandOk("*");

describe("Repeat [Int, String]", () => {
  test("repeats B A times", [Int(2), String("ab")], [String("abab")]);

  test(
    "pushes empty string if B is empty",
    [Int(2), String("")],
    [String("")],
  );

  test(
    "pushes empty string if A is zero",
    [Int(0), String("ab")],
    [String("")],
  );
});

describe("Repeat [String, Int]", () => {
  test(
    "repeats every character in A B times",
    [String("ab"), Int(2)],
    [String("aabb")],
  );

  test(
    "pushes empty string if B is zero",
    [String("ab"), Int(0)],
    [String("")],
  );

  test(
    "pushes empty string if A is empty",
    [String(""), Int(2)],
    [String("")],
  );
});
