# Commands

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
`_` | duplicate | `A<itm>` | `B<itm> A<itm>` | Duplicates the top stack item. | :heavy_check_mark:
`;` | discard | `A<itm>` | ` ` | Discards the top stack item. | :heavy_check_mark:
`@` | rotate | `C<itm> B<itm> A<itm>` | ` ` | Pushes the 3rd item to the top and shifts the other two down. | :x:
`/` | swap | `A<itm> B<itm>` | ` ` | Swaps the top two stack items. | :x:
`+` | concat | `A<lst> B<lst>` | `A<lst>` | Concatenates `B` and `A`. | :x:
`+` | concat | `A<lst> B<itm>` | `A<lst>` | Adds `A` to the end of `B`. | :x:
`+` | concat | `A<itm> B<lst>` | `A<lst>` | Adds `B` to the start of `A`. | :x:
`+` | concat | `A<str> B<str>` | `A<str>` | Appends `A` to the end of `B` | :heavy_check_mark:
`+` | add | `A<int> B<int>` | `A<int>` | Adds `A` and `B` | :heavy_check_mark:
`$` | copy | `A<int>` | `A<itm>` | Copies the item with the index `A` to the top of the stack. Index 0 is the item on the bottom of the stack. | :x:
`h` | firstElement | `A<lst\|str>` | `A<str>` | Pushes the first element/char of `A`. Pushes nothing if `A` is empty. | :x:
`h` | increment | `A<int>` | `A<int>` | Increments A. | :heavy_check_mark:
`k` | swapCase | `A<lst>` | `A<lst>` | Convert every element in `A` to to a string and swap its case. Nested lists will be flattened during that. | :x:
`l` | lowercase | `A<lst>` | `A<lst>` | Convert every element in `A` to to a string and lowercase it. Nested lists will be flattened during that. | :x:
`r` | reverse | `A<lst>` | `A<lst>` | Reverse A. | :x:
`r` | reverseInt | `A<int>` | `A<int>` | Reverse the digits on A. Leading zero are removed. | :x:
`t` | listLength | `A<lst>` | `A<int>` | Get the length of A. | :x:
`t` | intLength | `A<int>` | `A<int>` | Get the digit count of A. | :x:
`u` | uppercase | `A<lst>` | `A<lst>` | Convert every element in `A` to to a string and uppercase it. Nested lists will be flattened during that. | :x:
`v` | lastElement | `A<lst>` | `A<itm>` | Pushes the last element from A. Pushes nothing if `A` is empty. | :x:
`v` | decrement | `A<int>` | `A<int>` | Decrements A. | :x:
`y` | allButFirst | `A<lst>` | `A<lst>` | Pushes all but the first element of A. Pushes nothing if `A` has less than two elements. | :x:
`y` | allButFirstOfInt | `A<int>` | `A<int>` | Takes all but the first digit of `A` and pushes the rest as new integer. | :x:
`z` | allButLast | `A<lst>` | `A<lst>` | Pushes all but the last element of A. Pushes nothing if `A` has less than two elements. | :x:
`z` | allButLastOfInt | `A<int>` | `A<int>` | Takes all but the last digit of `A` and pushes the rest as new integer. | :x:
