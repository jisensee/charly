open StackItem;
open CommandUtils;

let repeat =
  CommandFn.Arity2(
    (stack, items) =>
      switch (items) {
      // Repeat B A times
      | (Int(i), String(s)) =>
        s->Js.String2.repeat(i)->Stack.pushString(stack, _)->Some
      // Repeat every char in A B times
      | (String(s), Int(i)) =>
        stringToList(s)
        ->List.map(c => c->Js.String2.repeat(i))
        ->listToString
        ->Stack.pushString(stack, _)
        ->Some
      | _ => None
      },
  );
