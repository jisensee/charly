open CommandFn;

let discard = Arity1((stack, _) => stack->Some);

let duplicate =
  Arity1((stack, item) => stack->Stack.push(item)->Stack.push(item)->Some);
