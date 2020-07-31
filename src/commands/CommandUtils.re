let splitString = (s, separator) =>
  s->Js.String2.split(separator)->List.fromArray;

let stringToList = splitString(_, "");

let joinList = (l, sep) => l->List.toArray->Js.Array2.joinWith(sep);
let listToString = joinList(_, "");
