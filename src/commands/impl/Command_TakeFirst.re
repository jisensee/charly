let takeFirst =
  CommandFn.Arity2(
    (stack, items) =>
      switch (items) {
      | (Int(i), String(s)) =>
        s
        ->Js.String2.slice(~from=0, ~to_=i)
        ->Stack.pushString(stack, _)
        ->Some
      | _ => None
      },
  );
