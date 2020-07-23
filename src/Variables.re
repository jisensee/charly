type t = Map.String.t(StackItem.t);

let default: t =
  StackItem.(
    Map.String.fromArray([|
      ("A", String(" ")),
      ("B", String("\n")),
      ("C", String("abcdefghijklmnopqrstuvwxyz")),
      ("D", String("ABCDEFGHIJKLMNOPQRSTUVWXYZ")),
      ("E", String("")),
      ("F", Int(1)),
      ("G", Int(2)),
      ("H", Int(3)),
      ("I", String(".")),
      ("J", String(",")),
    |])
  );
let empty: t = Map.String.empty;

let exists = (t: t, s) => t->Map.String.has(s);
let assign = (t: t, ~name, ~value): t => t->Map.String.set(name, value);
let get = (t: t, key) => t->Map.String.get(key);
