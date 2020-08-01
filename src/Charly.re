let runCode = (code, input) =>
  code
  ->Code.fromString
  ->Parser.parse
  ->Result.flatMap(tokens =>
      Interpreter.run(input->Stack.fromStringList, Variables.default, tokens)
    )
  ->Result.map(fst)
  ->Result.map(Stack.toString);
