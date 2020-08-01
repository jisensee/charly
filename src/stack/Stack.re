type t = list(StackItem.t);

let push = List.add;
let pushString = (stack, s) => s->StackItem.String->push(stack, _);
let pushInt = (stack, i) => i->StackItem.Int->push(stack, _);
let pushList = (stack, lst) => lst->StackItem.List->push(stack, _);
let empty = [];

let fromStringList = l => l->List.map(s => s->StackItem.String);
let toStringList = stack => stack->List.reverse->List.map(StackItem.toString);
let toString = stack => stack->toStringList->List.reduce("", (++));

let pop = (stack, count) => {
  let rec popItems = (stack, count, poppedItems) =>
    count == 0
      ? (stack, poppedItems)->Some
      : (
        switch (stack) {
        | [i, ...rest] =>
          popItems(rest, count - 1, poppedItems->List.add(i))
        | [] => None
        }
      );
  popItems(stack, count, [])
  ->Option.map(((s, items)) => (s, items->List.reverse));
};

let pop1 = stack =>
  switch (pop(stack, 1)) {
  | Some((rest, [i])) => (rest, i)->Some
  | _ => None
  };

let pop2 = stack =>
  switch (pop(stack, 2)) {
  | Some((rest, [i1, i2])) => (rest, (i1, i2))->Some
  | _ => None
  };

let pop3 = stack =>
  switch (pop(stack, 3)) {
  | Some((rest, [i1, i2, i3])) => (rest, (i1, i2, i3))->Some
  | _ => None
  };

let peek1 =
  fun
  | [i, ..._] => Some(i)
  | _ => None;

let peek2 =
  fun
  | [i1, i2, ..._] => Some((i1, i2))
  | _ => None;

let peek3 =
  fun
  | [i1, i2, i3, ..._] => Some((i1, i2, i3))
  | _ => None;
