let readFile: string => option(string) = [%raw
  {|
function(path) {
  try {
    return require('fs').readFileSync(path, 'utf-8')
  } catch(_) {
    return undefined
  }
}
|}
];
let getStdin: unit => option(string) = [%raw
  {|
function() {
  try {
    return require('fs').readFileSync(0, 'utf-8')
  } catch(_) {
    return undefined
  }
}
|}
];

let code: ref(option(string)) = ref(None);
let file: ref(option(string)) = ref(None);
let specList = [
  ("-c", Arg.String(s => code := s->Some), "The code to run"),
  (
    "-s",
    Arg.String(s => file := s->Some),
    "The source file containing the code to run",
  ),
];
Arg.parse(specList, _ => (), "usage");

let input = getStdin()->Option.map(c => [c])->Option.getWithDefault([]);
let result =
  switch (code^, file^) {
  | (Some(c), None) => Charly.runCode(c, input)
  | (None, Some(path)) =>
    path
    ->readFile
    ->Option.map(Charly.runCode(_, input))
    ->Option.getWithDefault(Result.Error(Error.SourceFileNotFound))
  | _ =>
    Result.Error(
      Error.InvalidCliArgs(
        "Please provide either the code to execute or a source file.",
      ),
    )
  };
switch (result) {
| Ok(output) => Js.log(output)
| Error(err) => err->Error.ErrorUtils.toString->Js.log
};
