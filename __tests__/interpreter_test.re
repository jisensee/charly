open Jest;
open Expect;

module Tok = ParserToken;
module StIt = StackItem;

let expectOk = (tokens, expectedStack, ()) =>
  expect(Interpreter.run(Stack.empty, tokens))
  |> toEqual(Result.Ok(expectedStack));
let expectError = (tokens, expectedError, ()) =>
  expect(Interpreter.run(Stack.empty, tokens))
  |> toEqual(Result.Error(expectedError));

describe("Interpreter.run", () => {
  test(
    "Can push strings",
    expectOk([Tok.String(0, "abc")], [StIt.String("abc")]),
  );
  test("can push ints", expectOk([Tok.Int(0, 12)], [StIt.Int(12)]));

  test(
    "can push simple lists",
    expectOk(
      [Tok.List(0, [Tok.String(0, "a"), Tok.String(0, "b")])],
      [StIt.List(["a", "b"])],
    ),
  );

  test(
    "can push nested lists",
    expectOk(
      [
        Tok.List(
          0,
          [
            Tok.String(0, "a"),
            Tok.List(0, [Tok.Int(0, 1), Tok.Int(0, 42)]),
          ],
        ),
      ],
      [StIt.List(["a", "142"])],
    ),
  );
});
