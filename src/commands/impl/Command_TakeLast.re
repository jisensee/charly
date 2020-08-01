open StackItem;

let takeLast =
  CommandFn.Arity2(
    (stack, items) =>
      switch (items) {
      | (Int(i), String(s)) =>
        let len = s->String.length;
        let from = i > len ? 0 : len - i;
        s->Js.String2.sliceToEnd(~from)->Stack.pushString(stack, _)->Some;
      | _ => None
      },
  );
