open Jest;
open Expect;

module Tok = ParserToken;
module StIt = StackItem;

let expectOk = (tokens, expectedStack, ()) =>
  expect(
    Interpreter.run(Stack.empty, Variables.empty, tokens)->Result.map(fst),
  )
  |> toEqual(Result.Ok(expectedStack));
let expectError = (tokens, expectedError, ()) =>
  expect(Interpreter.run(Stack.empty, Variables.default, tokens))
  |> toEqual(Result.Error(expectedError));

let expectAllOk = (tokens, expectedStack, variablesOk, ()) =>
  expect(
    Interpreter.run(Stack.empty, Variables.default, tokens)
    ->Result.map(((st, vars)) => (st, variablesOk(vars))),
  )
  |> toEqual(Result.Ok((expectedStack, true)));

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

  test(
    "can assign variables",
    expectAllOk(
      [Tok.String(0, "abc"), Tok.VariableAssignment(0, "A")],
      [StIt.String("abc")],
      vars =>
      vars->Variables.get("A")->Option.eq(Some(StIt.String("abc")), (==))
    ),
  );

  test(
    "errors when trying to assign variable with empty stack",
    expectError(
      [Tok.VariableAssignment(0, "A")],
      Error.NoValueOnStackForAssignment(0),
    ),
  );

  test(
    "can push variables",
    expectOk(
      [
        Tok.Int(0, 1),
        Tok.VariableAssignment(0, "A"),
        Tok.Command(0, Command.PushVariable("A")),
      ],
      [StIt.Int(1), StIt.Int(1)],
    ),
  );
});
