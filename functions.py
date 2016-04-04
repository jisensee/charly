import re

from iposTypes import Item, String, Integer, Command
from helperFunctions import applyCommands, splitString, sortAscWithKey
from errors import InvalidEvalStringException


"""
The following functions take the stack as paramter, pop the needed arguments and push the result.
The stack gets mutated in place, so nothing is returned
A always refers to the top item, B to the item after that, etc.
"""	
	
def IDuplicateTopStackItem(stack):
	modeList = [{
			"types" : [Item],
			"name" : "duplicate"
		},
	]
	M, A = stack.popArguments(modeList, 1, unpack=False)
	
	# Duplicate the top item on the stack
	if M == "duplicate":
		stack.push(A)
		stack.push(A)
		
def ICopyStackItem(stack):
	modeList = [{
			"types" : [Integer],
			"name" : "copy"
		},
	]
	M, A = stack.popArguments(modeList, 1)
	
	# Copies the item at index A to the top of the stack
	if M == "copy":
		result = stack.getItem(A % stack.getLength())
		stack.push(result)		
		
def ISwapTopStackItems(stack, unpack=False):
	modeList = [{
			"types" : [Item, Item],
			"name" : "swap"
		},
	]
	M, B, A = stack.popArguments(modeList, 2, unpack=False)
	
	# Swaps the position of A and B on the stack
	if M == "swap":
		stack.push(A)
		stack.push(B)
		
def IRotateTopStack(stack, unpack=False):
	modeList = [{
			"types" : [Item, Item, Item],
			"name" : "rotate"
		},
	]
	M, C, B, A = stack.popArguments(modeList, 3, unpack=False)
	
	# Push C to the top and A and B down
	if M == "rotate":
		stack.push(B)
		stack.push(A)
		stack.push(C)

def IDiscardTopStackItem(stack):
	modeList = [{
			"types" : [Item],
			"name" : "discard"
		},
	]
	M = stack.popArguments(modeList, 1)[0]
	
	# Top item already got popped, nothing to do
	if M == "discard":
		pass
			
def IEval(stack):
	modeList = [{
			"types" : [String],
			"name" : "eval"
		},
	]
	M, A = stack.popArguments(modeList, 1)

	# Executes the numeric calculations in A and pushes the result as int
	if M == "eval":		
		# only keep chars for numeric calculations 
		allowedChars = "1234567890+-/*()"
		result = "".join([c for c in A if c in allowedChars])
		
		# remove leading zeros in number literals
		result = re.sub(r"0+(\d+)", r"\1", result)
		
		# Replace float through integer division
		result = re.sub(r"([^/])/([^/])", "\\1//\\2", result)
		
		try:
			result = eval(result)
		except SyntaxError:
			raise InvalidEvalStringException(result)
		
		stack.pushString(result)

def ISlice(stack):
	modeList = [{
			"types" : [String, Integer, Integer],
			"name" : "sliceIntInt"
		},
	]
	K, C, B, A = stack.popArguments(modeList, 3)
	
	if K == "sliceIntInt":
		result = C[B % len(C) : A % len(C)]	
		stack.pushString(result)
		
	
def IReverse(stack):
	modeList = [{
			"types" : [String],
			"name" : "reverse"
		},
	]
	M, A = stack.popArguments(modeList, 1)
	
	# Reverses A
	if M == "reverse":
		result = A[::-1]
		stack.pushString(result)
	
def IStrip(stack):
	modeList = [{
			"types" : [String, String],
			"name" : "stripString"
		}, {
			"types" : [String, Integer],
			"name" : "stripInt"
		},
	]
	M, B, A = stack.popArguments(modeList, 2)
	
	# Remove leading and trailing  As from B
	if M == "stripString":
		result = B.strip(A)
		stack.pushString(result)
		
	# Remove A leading and trailing chars from B
	elif M == "stripInt":
		result = B[A :][::-1][A :][::-1]
		stack.pushString(result)
	
def IWrap(stack):
	modeList = [{
			"types" : [String],
			"name" : "wrap"
		},
	]
	M, A = stack.popArguments(modeList, 1)
	
	# Remove all newlines from A
	if M == "wrap":		
		result = "".join(re.split(r"\\n|\\r", A))
		stack.pushString(result)
	
def IReplace(stack):
	modeList = [{
			"types" : [String, String, String],
			"name" : "replace"
		}, 
	]
	M, C, B, A = stack.popArguments(modeList, 3)
	
	# Replaces all occurences of a regex pattern B with A in C
	if M == "replace":
		result = re.sub(B, A, C)
		stack.pushString(result)
		
def IMultiply(stack):
	
	modeList = [{
			"types" : [String, Integer],
			"name" : "multiply"
		},
	]
	M, B, A = stack.popArguments(modeList, 2)
	
	# Repeats every character in B A times
	if M == "multiply":
		result = "".join([c*A for c in B])	
		stack.pushString(result)

def ISwapCase(stack):

	modeList = [{
			"types" : [String],
			"name" : "swapCase"
		},
	]
	
	M, A = stack.popArguments(modeList, 1)
	
	if M == "swapCase":
		result = A.swapcase()
		stack.pushString(result)
		
def IRemove(stack):
	modeList = [{
			"types" : [String, String],
			"name" : "removeCharsFromStr"
		}, {
			"types" : [String, Integer],
			"name" : "removeEverNChar"
		},
	]
	M, B, A = stack.popArguments(modeList, 2)
	
	# Remove all characters in A from B
	if M == "removeCharsFromStr":
		result = "".join(filter(lambda c: c not in A, B))	
		stack.pushString(result)
		
	# Remove every Ath char from B
	elif M == "removeEverNChar":
		if A != 0:
			result = "".join(map(lambda t: t[1], filter(lambda t: t[0] % A != 0, enumerate(B))))
		else:
			result = B
		stack.pushString(result)
	
def IRemoveWithRegex(stack):
	modeList = [{
			"types" : [String, String],
			"name" : "removeWithRegex"
		},
	]
	M, B, A = stack.popArguments(modeList, 2)
	
	# Remove all matches of the regex A in B from B
	if M == "removeWithRegex":
		result = re.sub(A, "", B)
		stack.pushString(result)
	
def IConcatenate(stack):
	modeList = [{
			"types" : [String, String],
			"name" : "concatStrings"
		}, {
			"types" : [Integer, Integer],
			"name" : "concatInts"
		},
	]
	M, B, A = stack.popArguments(modeList, 2)
	
	# B + A
	if M == "concatStrings":
		stack.pushString(B + A)
	# str(b) + str(A)
	elif M == "concatInts":
		stack.pushString(str(B) + str(A))
	
def IExecuteCommands(stack):
	from interpreter import run
	
	modeList = [{
		"types" : [Command],
		"name" : "executeCommands"
		},
	]
	M, A = stack.popArguments(modeList, 1)
	
	# Execute the given commands using and manipulating the stack
	if M == "executeCommands":
		run(A, stack)
	
def IApplyToChars(stack):
	modeList = [{
			"types" : [String, Command],
			"name" : "applyToChars",
		}
	]
	M, B, A = stack.popArguments(modeList, 2)
	
	# Apply A to every character of B
	if M == "applyToChars":
		result = "".join(map(lambda c: applyCommands(A, c), B))
		stack.pushString(result)
	
def IApplyToParts(stack):
	modeList = [{
			"types" : [String, String, Command],
			"name" : "applyToParts",
		}
	]
	M, C, B, A = stack.popArguments(modeList, 3)
	
	# Apply A to every element of C.split(B)
	if M == "applyToParts":
		splittedStr = splitString(B, C)
		result = B.join(map(lambda c: applyCommands(A, c), splittedStr))
		stack.pushString(result)
	
def IApplyToPartsRandomly(stack):
	modeList = [{
			"types" : [String, String, Command],
			"name" : "applyToPartsRandomly",
		}
	]
	M, C, B, A = stack.popArguments(modeList, 3)
	
	# Apply A to every element of C.split(B)
	if M == "applyToPartsRandomly":
		splittedStr = splitString(B, C)
		result = B.join(map(lambda c: applyCommands(A, c, rand = True), splittedStr))
		stack.pushString(result)
		
def ISortAsc(stack):
	modeList = [{
			"types" : [String, String],
			"name" : "sort"
		},
	]
	M, A, B = stack.popArguments(modeList, 2)
	
	# Split B on A, sort the substrings ascending and join back on B
	if M == "sort":
		splittedStr = splitString(B, A)
		result = B.join(sorted(splittedStr))
		stack.pushString(result)
	
def ISortAscWithKey(stack):
	modeList = [{
			"types" : [String, String, Command],
			"name" : "sortAscWithKey"
		},
	]
	M, C, B, A = stack.popArguments(modeList, 3)
	
	# Split C on B, sort parts ascending with key function A and join back on B
	if M == "sortAscWithKey":
		result = sortAscWithKey(C, B, A)
		stack.pushString(result)
		
def ISortDesc(stack):
	modeList = [{
			"types" : [String, String],
			"name" : "sortDesc"
		},
	]
	M, A, B = stack.popArguments(modeList, 2)
	
	# SPlit B on A, sort the substrings descending and join back on B
	if M == "sortDesc":
		splittedStr = splitString(B, A)
		result = B.join(sorted(splittedStr, reverse=True))
		stack.pushString(result)

def ISortDescWithKey(stack):	
	modeList = [{
			"types" : [String, String, Command],
			"name" : "sortDescWithKey"
		},
	]
	M, C, B, A = stack.popArguments(modeList, 3)
	
	# Split C on B, sort parts descending with key function A and join back on B
	if M == "sortDescWithKey":
		result = sortAscWithKey(C, B, A, True)
		stack.pushString(result)
		
def ISort(stack):
	modeList = [{
			"types" : [String],
			"name" : "sort"
		},
	]
	M, A = stack.popArguments(modeList, 1)
	
	if M == "sort":
		result = "".join(sorted(A))
		stack.pushString(result)
		
def IUpperCase(stack):
	modeList = [{
			"types" : [String],
			"name" : "uppercase"
		},
	]
	M, A = stack.popArguments(modeList, 1)
	
	# Uppercase the A
	if M == "uppercase":
		result = A.upper()
		stack.pushString(result)

def ILowerCase(stack):
	modeList = [{
			"types" : [String],
			"name" : "lowercase"
		},
	]
	M, A = stack.popArguments(modeList, 1)
	
	# Lowercase the A
	if M == "lowercase":
		result = A.lower()
		stack.pushString(result)

def IFirstChars(stack):
	modeList = [{
			"types" : [String, Integer],
			"name" : "firstChars"
		},
	]
	M, B, A = stack.popArguments(modeList, 2)
	
	# Take the first A characters from B
	if M == "firstChars":
		if len(B) > 0:
			result = B[: A % len(B)]
			stack.pushString(result)

def ILastChars(stack):
	modeList = [{
			"types" : [String, Integer],
			"name" : "lastChars"
		},
	]
	M, B, A = stack.popArguments(modeList, 2)
	
	# Take the last A characters from B
	if M == "lastChars":
		if len(B) > 0:
			result = B[len(B) - A % len(B) : ]
			stack.pushString(result)
		
def IFirstChar(stack):
	modeList = [{
			"types" : [String],
			"name" : "firstChar"
		}, {
			"types" : [Integer],
			"name" : "incrementInt"
		}
	]
	M, A = stack.popArguments(modeList, 1)
	
	# Take the first character from A
	if M == "firstChar":
		# Push nothing if A is empty
		if len(A) > 0:
			result = A[0]
			stack.pushString(result)
	
	# Increment A
	elif M == "incrementInt":
		result = A + 1
		stack.pushInteger(result)
		
def ILastChar(stack):
	modeList = [{
			"types" : [String],
			"name" : "lastChar"
		}, {
			"types" : [Integer],
			"name" : "decrementInt"
		}
	]
	M, A = stack.popArguments(modeList, 1)
	
	# Take the last  character from A
	if M == "lastChar":
		# Push nothing if A is empty
		if len(A) > 0:
			result = A[-1]
			stack.pushString(result)
			
	# Decrement A
	elif M == "decrementInt":
		result = A - 1
		stack.pushInteger(result)
			
def IAllButFirstChar(stack):
	modeList = [{
			"types" : [String],
			"name" : "allButFirstChar"
		},
	]
	M, A = stack.popArguments(modeList, 1)
	
	# Take all but the first character from A
	if M == "allButFirstChar":
		# Push nothing if A has only one character
		if len(A) > 1:
			result = A[1:]
			stack.pushString(result)
		
def IAllButLastChar(stack):
	modeList = [{
			"types" : [String],
			"name" : "allButLastChar"
		},
	]
	M, A = stack.popArguments(modeList, 1)
	
	# Take all but the last character from A
	if M == "allButLastChar":
		# Push nothing if A has only one character
		if len(A) > 1:
			result = A[:-1]
			stack.pushString(result)
