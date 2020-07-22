open StackItem;

type t =
  | Head
  | Duplicate
  | Discard;

let fromString =
  fun
  | "h" => Head->Some
  | "_" => Duplicate->Some
  | ";" => Discard->Some
  | _ => None;

let discard = stack =>
  switch (stack->Stack.pop1) {
  | Some((s, _)) => s->Some
  | None => None
  };

let duplicate = stack => stack->Stack.peek1->Option.map(Stack.push(stack));

let head = stack =>
  switch (stack->Stack.pop1) {
  | Some((s, List(lst))) => lst->List.head->Option.map(Stack.pushString(s))
  | Some((s, Int(i))) => Stack.pushInt(s, i + 1)->Some
  | _ => None
  };
let execute = (stack, command) =>
  switch (command) {
  | Head => stack->head
  | Duplicate => stack->duplicate
  | Discard => stack->discard
  };
