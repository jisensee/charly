type t = list(StackItem.t);

let empty: t;

let push: (t, StackItem.t) => t;
let pushString: (t, string) => t;
let pushInt: (t, int) => t;
let pushList: (t, list(string)) => t;

let pop1: t => option((t, StackItem.t));
let pop2: t => option((t, (StackItem.t, StackItem.t)));
let pop3: t => option((t, (StackItem.t, StackItem.t, StackItem.t)));

let peek1: t => option(StackItem.t);
let peek2: t => option((StackItem.t, StackItem.t));
let peek3: t => option((StackItem.t, StackItem.t, StackItem.t));

let toString: t => string;
let toStringList: t => list(string);
