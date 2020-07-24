open CommandDocGenTypes;

let writeFile: string => unit = [%raw
  {|
  function(content) {
    require('fs').writeFileSync('./documentation/commands.md', content)
  }
|}
];

let header = {|# Commands

## Notes
* `A` refers to the item on top of the stack, `B` to the next one, etc. Every command has a fixed arity but might accept different combinations of types.
* With the exception of `#`, every command-object that gets applied to an item uses it's own stack which is initialized to the value of the item that it gets applied to. At the end of the execution of the command-object this stack gets joined into one string, just like the main stack of the program.
* Unless noted otherwise, all commands pop their arguments from the stack and leave the result.

## Types
Charly knows the following types:
* `<str>` -> String
* `<int>` -> Integer
* `<cmd>` -> Command
* `<lst>` -> List
* `<rgx>` -> Regex
* `<itm>` -> Item, any of  the ones above

Command | Name | Arguments | Result | Description | Implemented
:-----: | ---- | --------- | ------ | ----------- | ------------
|};

let backtick = s => "`" ++ s ++ "`";
let itemsToString = items => {
  let letter =
    fun
    | 0 => "A"
    | 1 => "B"
    | _ => "C";
  let lst =
    items->List.mapWithIndex((index, item) =>
      index->letter ++ item->itemToString
    );
  switch (lst) {
  | [] => " "
  | itemList => itemList->List.toArray->Js.Array2.joinWith(" ")->backtick
  };
};
let backtickItems = description =>
  description
  ->Js.String2.replace(" A", " `A`")
  ->Js.String2.replace(" B", " `B`")
  ->Js.String2.replace(" C", " `C`");
let genRow = (~key, ~name, mode) =>
  "|"
  ++ [|
       key,
       name,
       mode.args->itemsToString,
       mode.result->itemsToString,
       mode.description->backtickItems,
       mode.implemented ? ":heavy_check_mark:" : ":x:",
     |]
     ->Js.Array2.joinWith("|");

let compareCommands = (c1, c2) => compare(c1.key, c2.key);
let table =
  CommandList.commands
  ->List.sort(compareCommands)
  ->List.map(cmd =>
      cmd.modes
      ->List.mapWithIndex((index, mode) =>
          switch (index) {
          | 0 => genRow(~key=cmd.key->backtick, ~name=cmd.name, mode)
          | _ => genRow(~key=" ", ~name=" ", mode)
          }
        )
    )
  ->List.flatten
  ->List.toArray
  ->Js.Array2.joinWith("\n");

writeFile(header ++ table);
