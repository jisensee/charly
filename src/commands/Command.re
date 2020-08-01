open Command_Stack;
open Command_Head;
open Command_Add;
open Command_Repeat;
open Command_TakeFirst;
open Command_TakeLast;

type t =
  | PushVariable(string)
  | Duplicate
  | Discard
  | Swap
  | Rotate
  | Head
  | Add
  | TakeFirst
  | TakeLast
  | Repeat;

let fromString =
  fun
  | ("A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J") as v =>
    PushVariable(v)->Some
  | "h" => Head->Some
  | "_" => Duplicate->Some
  | ";" => Discard->Some
  | "/" => Swap->Some
  | "@" => Rotate->Some
  | "+" => Add->Some
  | "<" => TakeFirst->Some
  | ">" => TakeLast->Some
  | "*" => Repeat->Some
  | _ => None;

let execute = (index, stack, variables, command) => {
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
      }
    | CommandFn.Custom(fn) => fn();

  (
    switch (command) {
    | Duplicate => duplicate
    | Discard => discard
    | Swap => swap
    | Rotate => rotate
    | Head => head
    | Add => add
    | TakeFirst => takeFirst
    | TakeLast => takeLast
    | Repeat => repeat
    | PushVariable(var) =>
      CommandFn.Custom(
        () =>
          variables
          ->Variables.get(var)
          ->Option.map(Stack.push(stack))
          ->Option.getWithDefault(stack)
          ->Result.Ok,
      )
    }
  )
  ->handleCommand;
};
