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
|`$`|copy|`A<int>`|`A<itm>`|Copies the item with the index `A` to the top of the stack with index 0 being the bottom item. If there is no item at the give index, nothing is pushed.|:x:
|`+`|add|`A<lst> B<lst>`|`A<lst>`|Append `A` to the end of `B`.|:x:
| | |`A<str> B<str>`|`A<str>`|Append `A` to the end of `B`.|:heavy_check_mark:
| | |`A<int> B<int>`|`A<int>`|Add `A` and `B`.|:heavy_check_mark:
|`;`|discard|`A<itm>`| |Discard the top stack item.|:heavy_check_mark:
|`@`|rotate|`A<itm> B<itm> C<itm>`|`A<itm> B<itm> C<itm>`|Push the 3rd item to the top and shift the other two down.|:x:
|`L`|length|`A<lst>`|`A<lst>`|Get the length of `A`.|:x:
| | |`A<str>`|`A<str>`|Get the length of `A`.|:x:
| | |`A<int>`|`A<int>`|Get the number of digits of `A`.|:x:
|`_`|duplicate|`A<itm>`|`A<itm> B<itm>`|Duplicate the top stack item|:heavy_check_mark:
|`h`|head|`A<int>`|`A<int>`|Increment `A`.|:heavy_check_mark:
| | |`A<lst>`|`A<str>`|Get the first element of `A`. Does nothing if A is empty.|:x:
| | |`A<str>`|`A<str>`|Get the first char of `A`. Does nothing if A is empty.|:x:
|`k`|swapCase|`A<lst>`|`A<lst>`|Swap the case of every string in `A`.|:x:
| | |`A<str>`|`A<str>`|Swap the case of every char in `A`.|:x:
|`l`|lowercase|`A<lst>`|`A<lst>`|Lowercase every string in `A`.|:x:
| | |`A<str>`|`A<str>`|Lowercase `A`.|:x:
|`r`|reverse|`A<lst>`|`A<lst>`|Reverse `A`.|:x:
| | |`A<str>`|`A<str>`|Reverse `A`.|:x:
| | |`A<int>`|`A<int>`|Reverse the digits of `A`. Leading zeros are removed.|:x:
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
|`~`|swap|`A<itm>`|`A<itm>`|Swaps the top two stack items.|:x: