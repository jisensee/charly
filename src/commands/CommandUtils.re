let splitString = (s, separator) =>
  s->Js.String2.split(separator)->List.fromArray;
let stringToList = splitString(_, "");
