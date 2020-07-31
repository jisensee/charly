open Jest;
open Expect;

let testCommandOk = (cmd, testTxt, inputStack, expectedStack) =>
  test(
    testTxt,
    () => {
      let tokens = [ParserToken.Command(0, cmd)];
      let actualStackResult =
        Interpreter.run(inputStack, Variables.empty, tokens)
        ->Result.map(fst);
      expect(actualStackResult) |> toEqual(Result.Ok(expectedStack));
    },
  );
