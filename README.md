# IPOS
A stack-based code-golf language made for string processing.

Work in progress, many functions to be implemented and to design.

##Contribute
If you want to implement planned functions, having an idea about a new function I didn't thought about or want to add some new fancy feaueres, go ahead and create a pull-request. However, make sure that all existing tests pass (shouldn't be an issue when adding new functions) and that you write some new tests for the new function (as soon as I set up the test suite). I won't merge pull requests where tests are missing or failing.

##Overview

At the start of a program the input gets placed on the stack automatically. At the end all stack items (excluding commands) get converted to a string, concatenated from bottom to top and printed. For example the program

```
'.!r%
```

splits an input string on dots, reverses each substring and joins the substrings back on dots.
Run it like this:

```
> python IPOS.py '.!r% -i Abc.def.ghi
cbA.fed.ihg
```

**How it works**
```
       Implicit: place input string on the stack (C)
'.     Push a dot to the stack (B)
!r     Push the reverse command to the stack (A)
%      Split C on B, apply A to every part and join the result on B
       Implicit: Output the stack contents
```
