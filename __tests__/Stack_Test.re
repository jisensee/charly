open Jest;
open Expect;
open Stack;
open StackItem;
let fromInts = ints => ints->List.map(i => Int(i));

describe("Stack.empty", () => {
  test("creates empty stack", () =>
    expect(empty->List.size) |> toBe(0)
  )
});

describe("Stack.pop1", () => {
  test("fails on empty stack", () =>
    expect(empty->pop1) |> toBe(None)
  );
  test("removes top stack item", () =>
    expect(fromInts([1, 2])->pop1)
    |> toEqual((fromInts([2]), Int(1))->Some)
  );
});

describe("Stack.pop2", () => {
  test("fails with not enough items", () =>
    expect(fromInts([1])->pop2) |> toBe(None)
  );
  test("removes the top two items", () =>
    expect(fromInts([1, 2, 3])->pop2)
    |> toEqual((fromInts([3]), (Int(1), Int(2)))->Some)
  );
});

describe("Stack.pop3", () => {
  test("fails with not enough items", () =>
    expect(fromInts([1, 2])->pop3) |> toBe(None)
  );
  test("removes the top three items", () =>
    expect(fromInts([1, 2, 3, 4])->pop3)
    |> toEqual((fromInts([4]), (Int(1), Int(2), Int(3)))->Some)
  );
});

describe("Stack.peek1", () => {
  test("fails on empty stack", () =>
    expect(empty->peek1) |> toBe(None)
  );
  test("gives the top item", () =>
    expect(fromInts([1, 2])->peek1) |> toEqual(Some(Int(1)))
  );
});

describe("Stack.push", () => {
  test("pushes an item", () =>
    expect([Int(1)]->push(Int(2))) |> toEqual([Int(2), Int(1)])
  )
});

describe("Stack.pushInt", () => {
  test("pushes an int", () =>
    expect([Int(1)]->pushInt(2)) |> toEqual([Int(2), Int(1)])
  )
});

describe("Stack.pushString", () => {
  test("pushes a string", () =>
    expect([String("1")]->pushString("2"))
    |> toEqual([String("2"), String("1")])
  )
});

describe("Stack.pushList", () => {
  test("pushes a list", () =>
    expect([List(["1", "2"])]->pushList(["3", "4"]))
    |> toEqual([List(["3", "4"]), List(["1", "2"])])
  )
});

describe("Stack.toString", () => {
  test("gives the string representation", () =>
    expect([List(["abc"]), Int(2)]->Stack.toString) |> toBe("2abc")
  )
});
describe("Stack.toStringList", () => {
  test("gives the string list representation", () =>
    expect([List(["abc"]), Int(2)]->Stack.toStringList)
    |> toEqual(["2", "abc"])
  )
});
