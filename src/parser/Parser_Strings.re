let handleString = (tail: Code.t) => {
  let rec extractString = (rest, foundChars) =>
    switch (rest) {
    | [] => (foundChars, rest)
    | [(_, "\\"), (_, "\""), ...tail] =>
      extractString(tail, foundChars->List.add("\""))
    | [(_, "\""), ...tail] => (foundChars, tail)
    | [(_, c), ...tail] => extractString(tail, foundChars->List.add(c))
    };

  let (chars, rest) = extractString(tail, []);
  let str = chars->List.reverse->List.toArray->Js.Array2.joinWith("");
  Result.Ok((str, rest));
};

let handleChar = tail => {
  switch (tail) {
  | [(_, c), ...rest] => Result.Ok((c, rest))
  | _ => Result.Error(Error.IncompleteCharLiteral)
  };
};
