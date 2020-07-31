open CommandFn;

let discard = Arity1((stack, _) => stack->Some);

let duplicate =
  Arity1((stack, item) => stack->Stack.push(item)->Stack.push(item)->Some);

let swap =
  Arity2(
    (stack, (i1, i2)) => stack->Stack.push(i1)->Stack.push(i2)->Some,
  );

let rotate =
  Arity3(
    (stack, (i1, i2, i3)) =>
      stack->Stack.push(i2)->Stack.push(i1)->Stack.push(i3)->Some,
  );
