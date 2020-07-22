type index = int;
type char = (index, string);
type t = list(char);

let fromList: list(string) => t =
  code => code->List.mapWithIndex((i, c) => (i, c));
let fromString: string => t =
  code => code->Js.String2.split("")->List.fromArray->fromList;
