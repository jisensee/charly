open Error;
let isDigit = s =>
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]->List.has(s, (===));

let handleDigit = (index, digit, tail) => {
  let rec extractDigits = (rest, foundDigits) =>
    switch (rest) {
    | [(_, d), ...tail] when isDigit(d) =>
      extractDigits(tail, foundDigits->List.add(d))
    | _ => (foundDigits, rest)
    };

  let (digits, rest) = extractDigits(tail, [digit]);
  digits
  ->List.reverse
  ->List.toArray
  ->Js.Array2.joinWith("")
  ->Int.fromString
  ->Option.map(i => Result.Ok((i, rest)))
  ->Option.getWithDefault(Result.Error(ThisShouldNotHappen(index)));
};
