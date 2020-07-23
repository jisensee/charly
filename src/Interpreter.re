let assignVariable = (index, name, stack, variables) =>
  switch (stack->Stack.peek1) {
  | None => Result.Error(Error.NoValueOnStackForAssignment(index))
  | Some(value) => variables->Variables.assign(~name, ~value)->Result.Ok
  };

let rec run = (initialStack, startVariables, tokens) =>
  tokens->List.reduce(
    (initialStack, startVariables)->Result.Ok, (acc, token) =>
    acc->Result.flatMap(((stack, variables)) =>
      switch (token) {
      | ParserToken.String(_, s) =>
        (stack->Stack.pushString(s), variables)->Result.Ok
      | ParserToken.Int(_, i) =>
        (stack->Stack.pushInt(i), variables)->Result.Ok
      | ParserToken.List(_, listTokens) =>
        run(Stack.empty, variables, listTokens)
        ->Result.map(((listStack, listVariables)) =>
            (
              listStack->Stack.toStringList->Stack.pushList(stack, _),
              listVariables,
            )
          )
      | ParserToken.VariableAssignment(index, name) =>
        assignVariable(index, name, stack, variables)
        ->Result.map(v => (stack, v))
      | ParserToken.Command(index, cmd) =>
        cmd
        ->Command.execute(index, stack, variables, _)
        ->Result.map(s => (s, variables))
      }
    )
  );
