open CommandFn;
open StackItem;

let concat =
  Arity2(
    (stack, items) =>
      switch (items) {
      | (String(s1), String(s2)) => stack->Stack.pushString(s2 ++ s1)->Some
      | (Int(i1), Int(i2)) => stack->Stack.pushInt(i1 + i2)->Some
      | _ => None
      },
  );

let head =
  Arity1(
    (stack, item) =>
      switch (item) {
      // | String(s) => (String.length(s) == 0 ? "" : Js.String.get(s, 0))->Stack.pushString->Some
      | List(lst) =>
        lst
        ->List.head
        ->Option.map(Stack.pushString(stack))
        ->Option.getWithDefault(stack)
        ->Some
      | Int(i) => stack->Stack.pushInt(i + 1)->Some
      | _ => None
      },
  );
