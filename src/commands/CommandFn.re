type t =
  | Arity1((Stack.t, StackItem.t) => option(Stack.t))
  | Arity2((Stack.t, (StackItem.t, StackItem.t)) => option(Stack.t))
  | Arity3(
      (Stack.t, (StackItem.t, StackItem.t, StackItem.t)) => option(Stack.t),
    )
  | Custom(unit => Result.t(Stack.t, Error.t));
