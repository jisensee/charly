open CommandFn;
open StackItem;
open CommandUtils;

let head =
  Arity1(
    (stack, item) =>
      switch (item) {
      | String(s) =>
        stringToList(s)
        ->List.head
        ->Option.mapWithDefault(stack, h => stack->Stack.pushString(h))
        ->Some
      | List(lst) =>
        lst
        ->List.head
        ->Option.map(Stack.pushString(stack))
        ->Option.getWithDefault(stack)
        ->Some
      | Int(i) =>
        stack
        ->Stack.pushInt(
            i
            ->Int.toString
            ->stringToList
            ->List.head
            ->Option.flatMap(Int.fromString)
            ->Option.getWithDefault(0),
          )
        ->Some
      },
  );
