open Jest;
open Expect;

let testCommandOk = (cmdKey, testTxt, inputStack, expectedStack) =>
  test(
    testTxt,
    () => {
      let tokens =
        switch (cmdKey->Command.fromString) {
        | None => []
        | Some(cmd) => [ParserToken.Command(0, cmd)]
        };
      let actualStackResult =
        Interpreter.run(inputStack, Variables.empty, tokens)
        ->Result.map(fst);
      expect(actualStackResult) |> toEqual(Result.Ok(expectedStack));
    },
  );
