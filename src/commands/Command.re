open Stack_Commands;
open Basic_Commands;

type t =
  | Head
  | Concat
  | Duplicate
  | Discard;

let fromString =
  fun
  | "h" => Head->Some
  | "_" => Duplicate->Some
  | ";" => Discard->Some
  | "+" => Concat->Some
  | _ => None;

let execute = (index, stack, command) => {
  let invalidArgCount = (i, arity) =>
    Result.Error(Error.InvalidCommandArgCount(i, arity));
  let invalidArgs = (peekFn, peekMapper) =>
    Result.Error(
      Error.InvalidCommandArgs(
        index,
        stack->peekFn->Option.mapWithDefault([], peekMapper),
      ),
    );
  let handleCommand =
    fun
    | CommandFn.Arity1(cmd) =>
      switch (stack->Stack.pop1) {
      | None => invalidArgCount(index, 1)
      | Some((s, i)) =>
        switch (cmd(s, i)) {
        | Some(res) => Result.Ok(res)
        | None => invalidArgs(Stack.peek1, i => [i])
        }
      }
    | CommandFn.Arity2(cmd) =>
      switch (stack->Stack.pop2) {
      | None => invalidArgCount(index, 2)
      | Some((s, (i1, i2))) =>
        switch (cmd(s, (i1, i2))) {
        | Some(res) => Result.Ok(res)
        | None => invalidArgs(Stack.peek2, ((i1, i2)) => [i1, i2])
        }
      }
    | CommandFn.Arity3(cmd) =>
      switch (stack->Stack.pop3) {
      | None => invalidArgCount(index, 3)
      | Some((s, (i1, i2, i3))) =>
        switch (cmd(s, (i1, i2, i3))) {
        | Some(res) => Result.Ok(res)
        | None => invalidArgs(Stack.peek3, ((i1, i2, i3)) => [i1, i2, i3])
        }
      };

  (
    switch (command) {
    | Head => head
    | Duplicate => duplicate
    | Discard => discard
    | Concat => concat
    }
  )
  ->handleCommand;
};
