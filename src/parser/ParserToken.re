type t =
  | String(Code.index, string)
  | Int(Code.index, int)
  | VariableAssignment(Code.index, string)
  | Command(Code.index, Command.t)
  | List(Code.index, list(t));

let mapString = (res, index) =>
  res->Result.map(((s, rest)) => (String(index, s), rest));

let mapInt = (res, index) =>
  res->Result.map(((i, rest)) => (Int(index, i), rest));

let mapList = (res, index, parse) =>
  res
  ->Result.flatMap(((listCode, rest)) =>
      parse(listCode)->Result.map(c => (c, rest))
    )
  ->Result.map(((listTokens, rest)) => (List(index, listTokens), rest));

let mapVariableAssignment = (index, tail) =>
  switch (tail) {
  | [(_, v), ...rest] => Result.Ok((VariableAssignment(index, v), rest))
  | [] => Result.Error(Error.IncompleteVariableAssignment)
  };
