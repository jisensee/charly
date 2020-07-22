let rec extractListChars = (i, tail: Code.t, unresolvedOpenings, foundChars) => {
  let recCall = (rest, bChange, newChar) =>
    extractListChars(
      i,
      rest,
      unresolvedOpenings + bChange,
      foundChars->List.add(newChar),
    );
  switch (tail) {
  | [(_, "[" as b), ...rest] => recCall(rest, 1, b)
  | [(_, "]"), ...rest] when unresolvedOpenings == 1 =>
    Result.Ok((foundChars->List.reverse->Code.fromList, rest))
  | [(_, "]" as b), ...rest] when unresolvedOpenings > 1 =>
    recCall(rest, -1, b)
  | [(_, c), ...rest] => recCall(rest, 0, c)
  | [] => Result.Error(Error.UnclosedList(i))
  };
};
