open Jest;
open CommandTestUtils;
open StackItem;

let test = testCommandOk(Command.Add);

describe("Add [String, String", () => {
  test(
    "Appends string A to the end of B",
    [String("abc"), String("def")],
    [String("defabc")],
  )
});

describe("Add [List, List]", () => {
  test(
    "Appends list A to the end of B",
    [List(["abc", "def"]), List(["ghi"])],
    [List(["ghi", "abc", "def"])],
  )
});

describe("Add [Int, Int]", () => {
  test("Adds A and B", [Int(1), Int(2)], [Int(3)])
});
