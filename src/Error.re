type t =
  | ThisShouldNotHappen(Code.index)
  | IncompleteCharLiteral
  | UnclosedList(Code.index)
  | InvalidCommandArgs(Code.index)
  | UnknownToken(Code.index, string);

module ErrorUtils = {
  let wrap = (i, msg) => "Position: " ++ Int.toString(i + 1) ++ ": " ++ msg;
  let toString =
    fun
    | ThisShouldNotHappen(i) => wrap(i, "Something went wrong, no idea what")
    | IncompleteCharLiteral => "Incomplete char literal at the end of the code"
    | UnclosedList(i) => wrap(i, "Unclosed list")
    | InvalidCommandArgs(i) => wrap(i, "Invalid args for command")
    | UnknownToken(i, t) => wrap(i, "Unknown token '" ++ t ++ "'");
};
