let rec tokenToStr = token =>
  ParserToken.(
    switch (token) {
    | String(_, s) => "String(" ++ s ++ ")"
    | Int(_, i) => "Int(" ++ Int.toString(i) ++ ")"
    | Command(_) => "Command"
    | List(_, tokens) => "List[" ++ tokensToStr(tokens) ++ "]"
    }
  )
and tokensToStr = tokens =>
  tokens->List.map(tokenToStr)->List.toArray->Js.Array2.joinWith(";");

let code = "1 2h";
let result =
  code
  ->Code.fromString
  ->Parser.parse
  ->Result.flatMap(tokens => Interpreter.run(Stack.empty, tokens))
  ->Result.map(Stack.toString);
switch (result) {
| Result.Ok(s) => Js.log(s)
| Result.Error(err) => err->Error.ErrorUtils.toString->Js.log
};
