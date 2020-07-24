type item =
  | Item
  | String
  | Int
  | List
  | Regex
  | Command;

let itemToString =
  fun
  | Item => "<itm>"
  | String => "<str>"
  | Int => "<int>"
  | List => "<lst>"
  | Regex => "<rgx>"
  | Command => "<cmd>";

type mode = {
  args: list(item),
  result: list(item),
  description: string,
  implemented: bool,
};

type command = {
  key: string,
  name: string,
  modes: list(mode),
};
