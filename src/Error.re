type t =
  | ThisShouldNotHappen(Code.index)
  | IncompleteCharLiteral
  | IncompleteVariableAssignment
  | UnclosedList(Code.index)
  | NoValueOnStackForAssignment(Code.index)
  | InvalidCommandArgs(Code.index, list(StackItem.t))
  | InvalidCommandArgCount(Code.index, int)
  | UnknownToken(Code.index, string);

module ErrorUtils = {
  let wrap = (i, msg) => "Position: " ++ Int.toString(i + 1) ++ ": " ++ msg;
  let formatItems = items =>
    "["
    ++ items
       ->List.map(StackItem.toTypeString)
       ->List.toArray
       ->Js.Array2.joinWith(", ")
    ++ "]";
  let toString =
    fun
    | ThisShouldNotHappen(i) => wrap(i, "Something went wrong, no idea what")
    | IncompleteCharLiteral => "Incomplete char literal at the end of the code"
    | IncompleteVariableAssignment => "Incomplete variable assignment at the end of the code"
    | UnclosedList(i) => wrap(i, "Unclosed list")
    | NoValueOnStackForAssignment(i) =>
      wrap(i, "No value on stack present for assignment")
    | InvalidCommandArgs(i, items) =>
      wrap(i, formatItems(items) ++ " are no valid args for command")
    | InvalidCommandArgCount(i, required) =>
      wrap(
        i,
        "Not enough args present on stack for command, "
        ++ Int.toString(required)
        ++ " needed",
      )
    | UnknownToken(i, t) => wrap(i, "Unknown token '" ++ t ++ "'");
};
