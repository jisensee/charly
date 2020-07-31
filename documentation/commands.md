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
|`#`|execute|`A<cmd>`| |Execute `A` by using the current stack.|:x:
|`$`|copy|`A<int>`|`A<itm>`|Copy the item with the index `A` to the top of the stack with index 0 being the bottom item. If there is no item at the give index, nothing is pushed.|:x:
|`%`|replace|`A<str> B<str> C<str>`|`A<str>`|Replace all non-overlapping occurences of `B` in `C` with `A`.|:x:
| | |`A<str> B<rgx> C<str>`|`A<str>`|Replace all non-overlapping matches of `B` in `C` with `A`.|:x:
|`*`|repeat|`A<int> B<str>`|`A<str>`|Repeat `B` `A` times.|:x:
| | |`A<str> B<int>`|`A<str>`|Repeat every character in `A` `B` times.|:x:
|`+`|add|`A<lst> B<lst>`|`A<lst>`|Append `A` to the end of `B`.|:heavy_check_mark:
| | |`A<str> B<str>`|`A<str>`|Append `A` to the end of `B`.|:heavy_check_mark:
| | |`A<int> B<int>`|`A<int>`|Add `A` and `B`.|:heavy_check_mark:
|`-`|remove|`A<str> B<str>`|`A<str>`|Remove all occurences of `A` in `B`.|:x:
| | |`A<int> B<str>`|`A<str>`|Remove very `A`th character in `B`.|:x:
|`/`|swap|`A<itm>`|`A<itm>`|Swap the top two stack items.|:x:
|`:`|slice|`A<int> B<int> C<str>`|`A<str>`|Slice out a substring of `C` from index `B` (inclusive) to `A` (exclusive).|:x:
|`;`|discard|`A<itm>`| |Discard the top stack item.|:heavy_check_mark:
|`<`|takeFirst|`A<int> B<str>`|`A<str>`|Take the first `A` characters from `B`. Do nothing if B is empty.|:x:
|`>`|takeLast|`A<int> B<str>`|`A<str>`|Take the last `A` characters from `B`. Do nothing if B is empty.|:x:
|`@`|rotate|`A<itm> B<itm> C<itm>`|`A<itm> B<itm> C<itm>`|Push the 3rd item to the top and shift the other two down.|:x:
|`L`|length|`A<lst>`|`A<lst>`|Get the length of `A`.|:x:
| | |`A<str>`|`A<str>`|Get the length of `A`.|:x:
| | |`A<int>`|`A<int>`|Get the number of digits of `A`.|:x:
|`\|`|insert|`A<str> B<int> C<str>`|`A<str>`|Insert `A` at index `B` in `C`.|:x:
| | |`A<int> B<str> C<str>`|`A<str>`|Inserts `B` after every `A`th character in `C`.|:x:
| | |`A<str> B<int> C<lst>`|`A<str>`|Insert `A` at index `B` in `C`.|:x:
| | |`A<int> B<str> C<lst>`|`A<str>`|Inserts `B` after every `A`th string in `C`.|:x:
|`_`|duplicate|`A<itm>`|`A<itm> B<itm>`|Duplicate the top stack item|:heavy_check_mark:
|`a`|sortAscending|`A<lst>`|`A<lst>`|Sort all strings in `A` in ascending order.|:x:
| | |`A<str>`|`A<str>`|Sort all characters in `A` in ascending order.|:x:
|`d`|sortDescending|`A<lst>`|`A<lst>`|Sort all strings in `A` in descending order.|:x:
| | |`A<str>`|`A<str>`|Sort all characters in `A` in descending order.|:x:
|`f`|filter|`A<cmd> B<lst>`|`A<lst>`|Remove all strings from `B` for which the application of `A` results in an empty string.|:x:
| | |`A<cmd> B<str>`|`A<str>`|Remove all characters from `B` for which the application of `A` result in an empty string.|:x:
|`h`|head|`A<int>`|`A<int>`|Increment `A`.|:heavy_check_mark:
| | |`A<lst>`|`A<str>`|Get the first element of `A`. Does nothing if A is empty.|:heavy_check_mark:
| | |`A<str>`|`A<str>`|Get the first char of `A`. Does nothing if A is empty.|:heavy_check_mark:
|`i`|parseInt|`A<int>`|`A<str>`|Convert `A` to a string.|:x:
| | |`A<str>`|`A<int>`|Convert a to an int. Non-digit characters are removed before. Pushes nothing if no digit characters are present in `A`.|:x:
| | |`A<lst>`|`A<int>`|Convert `A` to a string and then to an int following the same rules as the string variant.|:x:
|`j`|join|`A<str> B<lst>`|`A<str>`|Join all strings of `B` on `A`.|:x:
| | |`A<str> B<str>`|`A<str>`|Join all characters of `B` on `A`.|:x:
|`k`|swapCase|`A<lst>`|`A<lst>`|Swap the case of every string in `A`.|:x:
| | |`A<str>`|`A<str>`|Swap the case of every char in `A`.|:x:
|`l`|lowercase|`A<lst>`|`A<lst>`|Lowercase every string in `A`.|:x:
| | |`A<str>`|`A<str>`|Lowercase `A`.|:x:
|`m`|map|`A<cmd> B<str>`|`A<str>`|Apply `A` to every character of `B`.|:x:
| | |`A<cmd> B<lst>`|`A<str>`|Apply `A` to every string of `B`.|:x:
|`r`|reverse|`A<lst>`|`A<lst>`|Reverse `A`.|:x:
| | |`A<str>`|`A<str>`|Reverse `A`.|:x:
| | |`A<int>`|`A<int>`|Reverse the digits of `A`. Leading zeros are removed.|:x:
|`s`|split|`A<rgx> B<str>`|`A<lst>`|Split `B` on the matches of `A` and push a list of the resulting substrings while discarding empty ones.|:x:
| | |`A<str> B<str>`|`A<lst>`|Split `B` on every occurence of `A` and push a list of the resulting substrings while discarding empty ones.|:x:
| | |`A<int> B<str>`|`A<lst>`|Split `B` into pieces of length `A` with the last elements being shorts if neccessary.|:x:
| | |`A<str> B<int>`|`A<lst>`|Split `A` into `B` pieces of equal length with the first element being longer if neccessary.|:x:
| | |`A<cmd> B<str>`|`A<lst>`|Split `B` on newlines and apply `A` to each element.|:x:
|`t`|tail|`A<lst>`|`A<lst>`|Get all but the first element of `A`. Does nothing if the length of A is <2.|:x:
| | |`A<str>`|`A<str>`|Get all but the first char of `A`. Does nothing if the length of A is <2.|:x:
| | |`A<int>`|`A<int>`|Get all but the first digit of `A`. Does nothing if the length of A is <2.|:x:
|`u`|uppercase|`A<lst>`|`A<lst>`|Uppercase every string in `A`.|:x:
| | |`A<str>`|`A<str>`|Uppercase `A`.|:x:
|`v`|last|`A<lst>`|`A<lst>`|Get the last string of `A`. Does nothing if A is empty.|:x:
| | |`A<str>`|`A<str>`|Get the last char of `A`. Does nothing if A is empty.|:x:
| | |`A<int>`|`A<int>`|Decrement `A`, but not below zero.|:x:
|`z`|allButLast|`A<lst>`|`A<lst>`|Get all but the last element of `A`. Does nothing if the length of A is <2.|:x:
| | |`A<str>`|`A<str>`|Get all but the last char of `A`. Does nothing if the length of A is <2.|:x:
| | |`A<int>`|`A<int>`|Get all but the last digit of `A`. Does nothing if the length of A is <2.|:x:
|`~`|splitMap|`A<cmd> B<str> C<str>`|`A<str>`|Split `C` on `B`, apply `A` to every part of the result and join the mapped parts back on B whle discarding empty parts.|:x:
| | |`A<cmd> B<rgx> C<str>`|`A<str>`|Split `C` on all matches of `B`, apply `A` to every part of the result and join the mapped parts back on matches groups. Empty strings are not discarded here.|:x: