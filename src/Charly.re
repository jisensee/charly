let runCode = code =>
  code
  ->Code.fromString
  ->Parser.parse
  ->Result.flatMap(tokens => Interpreter.run(Stack.empty, tokens))
  ->Result.map(Stack.toString);
