# Syntax

Charly has the following syntax elements:

**Integer literals**  
Using the digits `0-9`. To push multiple Integer literals in a row separate them with whitespaces.

**String literals**  
Wrapped in double quotes `"`. A closing quote is not necessary if it would be the last character of the program.

**Single character string literals**  
Started with an apostrophe `'`. Only the following character gets pushed as a string literal.

**Doublestring literals**  
Wrapped in 3 forwardticks `´`. If the last quote is not given, the rest of the code is pushed as the 2nd string. This is a shortcut to push 2 strings to the stack which can happen quite frequently.

**Command literals**  
Wrapped in curly braces `{...}`. A Command literal can be executed using the `#` command or be consumed by various other functional commands.

**Single character command literals**  
Started with an exclamation mark `!`. Only the following character gets pushed as a command literal.

**Lists**  
Wrapped in square brackets `[..., ...]`. The content of the list must only be other valid literals, nesting lists is allowed. The elements are separated by commas. When converted to a string, all elements of the list are first converted to a string and then joined together without a separator.

**Variables**  
Charly has a set of predefined variables which can pushed to the stack by just writing them. A list of all variables is available [[here|Variables]]. New variables can be assigned by using the `=` command followed by the variable name. The top item of the stack is then assigned to that name. This item is **not** removed from the stack. Variable names can only be one character long and overwrite their previous meaning.

**Commands**  
Everything that is not a literal or a variable is a command and manipulates the stack in a certain way. A list of all commands is available [[here|Commands]]. All commands pop the needed arguments from the stack and push a result.
