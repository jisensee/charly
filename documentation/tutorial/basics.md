# The basics

A Charly program can use the following syntax elements. You can see them in
detail [here](../syntax.md). In short those are:

- Integer literals
- String literals
- Regex literals
- Command literals
- Lists
- Commands
- Variables

The interpreter works as follows:

1. If an input string is supplied, place it on the stack.
2. Set the pointer to the first character in the program.
3. Evaluate the character at the pointer:
   - If it's a literal or a variable push it's value to the stack.
   - If it's a commands, pop the needed arguments from the stack, calculate the
     result and push it to the stack.
   - Set the pointer to the character after the processed
     literal/variable/list/command.
4. Repeat step 2 until the end of the program is reached.
5. Convert all stack contents to strings, concatenate them from bottom to top
   and print the resulting string.

Continue with [the stack](stack.md)
