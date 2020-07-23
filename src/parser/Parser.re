open Error;
open Parser_Strings;
open Parser_Ints;
open Parser_Lists;

let rec handleToken = (t: Code.char, tail: Code.t) => {
  switch (t) {
  | (index, "'") => handleChar(tail)->ParserToken.mapString(index)
  | (index, "\"") => handleString(tail)->ParserToken.mapString(index)
  | (index, d) when isDigit(d) =>
    handleDigit(index, d, tail)->ParserToken.mapInt(index)
  | (index, "[") =>
    extractListChars(index, tail, 1, [])->ParserToken.mapList(index, parse)
  | (index, "=") => ParserToken.mapVariableAssignment(index, tail)
  | (index, c) =>
    switch (Command.fromString(c)) {
    | Some(cmd) => Result.Ok((Command(index, cmd), tail))
    | None => Result.Error(UnknownToken(index, c))
    }
  };
}
and parse = (code: Code.t) => {
  let rec tok = (rest: Code.t, tokens) => {
    switch (rest) {
    | [(_, " " | "\t" | "\n" | "\r"), ...tail] => tok(tail, tokens)
    | [t, ...tail] =>
      handleToken(t, tail)
      ->Result.flatMap(((token, rest)) =>
          tok(rest, tokens->List.add(token))
        )
    | [] => Result.Ok(tokens)
    };
  };
  tok(code, [])->Result.map(List.reverse);
};
