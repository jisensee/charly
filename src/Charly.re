let runCode = code =>
  code
  ->Code.fromString
  ->Parser.parse
  ->Result.flatMap(tokens =>
      Interpreter.run(Stack.empty, Variables.default, tokens)
    )
  ->Result.map(fst)
  ->Result.map(Stack.toString);
