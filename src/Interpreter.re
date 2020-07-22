let rec run = (initialStack, tokens) =>
  tokens->List.reduce(initialStack->Result.Ok, (stackRes, token) =>
    stackRes->Result.flatMap(stack =>
      switch (token) {
      | ParserToken.String(_, s) => stack->Stack.pushString(s)->Result.Ok
      | ParserToken.Int(_, i) => stack->Stack.pushInt(i)->Result.Ok
      | ParserToken.List(_, listTokens) =>
        run(Stack.empty, listTokens)
        ->Result.map(listStack =>
            listStack->Stack.toStringList->Stack.pushList(stack, _)
          )
      | ParserToken.Command(index, cmd) =>
        cmd
        ->Command.execute(stack, _)
        ->Option.map(s => s->Result.Ok)
        ->Option.getWithDefault(
            Result.Error(Error.InvalidCommandArgs(index)),
          )
      }
    )
  );
