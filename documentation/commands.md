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
`_` | duplicate | `A<itm>` | `B<itm> A<itm>` | Duplicates the top stack item.
`;` | discard | `A<itm>` | ` ` | Discards the top stack item.
`@` | rotate | `C<itm> B<itm> A<itm>` | ` ` | Pushes the 3rd item to the top and shifts the other two down.
`/` | swap | `B<itm> A<itm>` | ` ` | Swaps the top two stack items.
`+` | concatLists | `B<lst> A<lst>` | `A<lst>` | Concatenates `B` and A.
`+` | concatListAndItem | `B<lst> A<itm>` | `A<lst>` | Adds `A` to the end of B.
`+` | concatItemAndList | `B<itm> A<lst>` | `A<lst>` | Adds `B` to the start of A.
`+` | concatItems | `B<itm> A<itm>` | `A<str>` | Converts `B` and `A` to strings and concatenates them.
`$` | copy | `A<int>` | `A<itm>` | Copies the item with the index `A` to the top of the stack. Index 0 is the item on the bottom of the stack.
`h` | firstElement | `A<lst>` | `A<itm>` | Pushes the first element of A. Pushes nothing if `A` is empty.
`h` | increment | `A<int>` | `A<int>` | Increments A.
`k` | swapCase | `A<lst>` | `A<lst>` | Convert every element in `A` to to a string and swap its case. Nested lists will be flattened during that.
`l` | lowercase | `A<lst>` | `A<lst>` | Convert every element in `A` to to a string and lowercase it. Nested lists will be flattened during that.
`r` | reverse | `A<lst>` | `A<lst>` | Reverse A.
`r` | reverseInt | `A<int>` | `A<int>` | Reverse the digits on A. Leading zero are removed.
`t` | listLength | `A<lst>` | `A<int>` | Get the length of A.
`t` | intLength | `A<int>` | `A<int>` | Get the digit count of A.
`u` | uppercase | `A<lst>` | `A<lst>` | Convert every element in `A` to to a string and uppercase it. Nested lists will be flattened during that.
`v` | lastElement | `A<lst>` | `A<itm>` | Pushes the last element from A. Pushes nothing if `A` is empty.
`v` | decrement | `A<int>` | `A<int>` | Decrements A.
`y` | allButFirst | `A<lst>` | `A<lst>` | Pushes all but the first element of A. Pushes nothing if `A` has less than two elements.
`y` | allButFirstOfInt | `A<int>` | `A<int>` | Takes all but the first digit of `A` and pushes the rest as new integer.
`z` | allButLast | `A<lst>` | `A<lst>` | Pushes all but the last element of A. Pushes nothing if `A` has less than two elements.
`z` | allButLastOfInt | `A<int>` | `A<int>` | Takes all but the last digit of `A` and pushes the rest as new integer.