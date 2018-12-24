# Commands

## Notes
* `A` refers to the item on top of the stack, `B` to the next one, etc. Every command has a fixed arity but might accept different combinations of types.
* With the exception of `#`, every command-object that gets applied to an item uses it's own stack which is initialized to the value of the item that it gets applied to. At the end of the execution of the command-object this stack gets joined into one string, just like the main stack of the program.
* Unless noted otherwise, all commands pop their arguments from the stack and leave the result.
* All command bindings here are not final yet. The basic commands will probably not get changed, but I will move lesser used commands to non-ASCII characters and use ASCII-characters for the most frequently used functions.

## Types
IPOS knows the following types:
* `<str>` -> String
* `<int>` -> Integer
* `<cmd>` -> Command
* `<lst>` -> List
* `<rgx>` -> Regex
* `<itm>` -> Item, any of  the ones above

Command | Mode | Arguments | Result | Description
:-----: | ---- | --------- | ------ | -----------
`l` | lowercase | `A<lst>` | `A<lst>` | Convert every element in `A` to to a string and lowercase it. Nested lists will be flattened during that.