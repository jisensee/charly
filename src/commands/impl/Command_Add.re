open CommandFn;
open StackItem;
open CommandUtils;

let add =
  Arity2(
    (stack, items) =>
      switch (items) {
      | (String(s1), String(s2)) => stack->Stack.pushString(s2 ++ s1)->Some
      | (List(l1), List(l2)) =>
        stack->Stack.pushList(l2->List.concat(l1))->Some
      | (Int(i1), Int(i2)) => stack->Stack.pushInt(i1 + i2)->Some
      | _ => None
      },
  );
