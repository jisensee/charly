"""
The following functions take the stack as paramter, pop the needed arguments and push the result.
The stack gets mutated in place, so nothing is returned
A always refers to the top item, B to the item after that, etc.
"""	

import re

from errors import InvalidEvalStringException
from helperFunctions import applyCommands, splitString, sortAscWithKey
from iposTypes import Item, String, Integer, Command, Regex, Array

def IWrapInArray(stack):
	content = stack.getContent()
	stack.clear()
	stack.pushArray(content)
	
def ISplatArray(stack):
	modeList = [{
			"types" : [Array],
			"name" : "splatArray"
		},
	]
	M, A = stack.popArguments(modeList, 1)
	
	# Push all element of A to the stack
	if M == "splatArray":
		for i in A:
			stack.push(i)

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
			result = int(eval(result))
		except SyntaxError:
			raise InvalidEvalStringException(result)
		
		stack.pushInteger(result)

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
			"name" : "replaceString"
		}, {
			"types" : [String, Regex, Regex],
			"name" : "replaceRegex"
		}
	]
	M, C, B, A = stack.popArguments(modeList, 3)
	
	# Replaces all occurences of a string B with A in C
	if M == "replaceString":
		result = C.replace(B, A)
		stack.pushString(result)
	# Replaces all occurences of a regex pattern B with A in C
	elif M == "replaceRegex":
		result = re.sub(B, A, C)
		stack.pushString(result)
		
def IRepeat(stack):
	
	modeList = [{
			"types" : [String, Integer],
			"name" : "repeatString"
		}, {
			"types" : [Integer, String],
			"name" : "repeatChars"
		},
	]
	M, B, A = stack.popArguments(modeList, 2)
	
	# Repeat B A times
	if M == "repeatString":
		result = B * A
		stack.pushString(result)
	
	# Repeats every character in A B times
	elif M == "repeatChars":
		result = "".join([c*B for c in A])	
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
		result = "".join(map(lambda c: applyCommands(A, c).join(), B))
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
		result = B.join(map(lambda c: applyCommands(A, c).join(), splittedStr))
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
		result = B.join(map(lambda c: applyCommands(A, c, rand = True).join(), splittedStr))
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
			"name" : "sortString"
		}, {
			"types" : [Array],
			"name" : "sortArray"
		}
	]
	M, A = stack.popArguments(modeList, 1)
	
	# Sort A anscending
	if M == "sortString":
		result = "".join(sorted(A))
		stack.pushString(result)
	# Sort A ascending using the str-representation of each element as key
	elif M == "sortArray":
		result = sorted(A, key=lambda e:str(e))
		stack.pushArray(result)
		
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

def ICountOccurences(stack):
	modeList = [{
			"types" : [String, String],
			"name" : "countOccurences"
		},
	]
	M, B, A = stack.popArguments(modeList, 2)
	
	if M == "countOccurences":
		result = len(re.findall(A, B))
		stack.pushInteger(result)

def ILength(stack):
	modeList = [{
			"types" : [String],
			"name" : "length"
		},
	]
	M, A = stack.popArguments(modeList, 1)
	
	if M == "length":
		result = len(A)
		stack.pushInteger(result)
		
def ISplit(stack):
	modeList = [{
			"types" : [String, String],
			"name" : "splitByString"
		}, {
			"types" : [String, Regex],
			"name" : "splitByRegex"
		}, {
			"types" : [String, Integer],
			"name" : "splitByLength"
		}, {
			"types" : [Integer, String],
			"name" : "splitByAmount"
		}, {
			"types" : [String, Command],
			"name" : "splitByNewlines"
		},
	]
	M, B, A = stack.popArguments(modeList, 2)
	
	# Split B on A
	if M == "splitByString":
		result = B.split(A)
		result = [String(s) for s in result if s]
		
		stack.pushArray(result)
				
	# Split B on the regex A
	elif M == "splitByRegex":
		result = re.split(A, B)
		result = [String(s) for s in result if s]
		
		stack.pushArray(result)
				
	# Split B into parts of length A			
	elif M == "splitByLength":
		if A != 0:
			parts = [String(B[i : i+A]) for i in range(0, len(B), A)]
			
			stack.pushArray(parts)
		else:
			stack.pushArray([String(B)])
				
	# Split A into B parts
	elif M == "splitByAmount":
		if B != 0:
			m = len(A) // B
			r = len(A) % B
			begin = 0
			end = m + (r > 0)
			
			result = []
			
			for i in range(B):
				result.append(String(A[begin : end]))
				begin = end
				end += m + (i + 1 < r)
				
			stack.pushArray(result)
		else:
			stack.pushArray([String(A)])
	
	# Split B on newlines and apply A
	elif M == "splitByNewlines":
		for line in B.splitlines():
			if line:
				stack.pushArray(applyCommands(A, line).getContent())
	
def IJoin(stack):
	modeList = [{
			"types" : [String],
			"name" : "joinOnString"
		}, {
			"types" : [Integer],
			"name" : "joinTop"
		}, {
			"types" : [Array],
			"name" : "joinArray"
		},
	]
	M, A = stack.popArguments(modeList, 1)
	
	# Join stack on A
	if M == "joinOnString":
		result = A.join([str(i) for i in stack.getContent()])
		stack.clear()
		stack.pushString(result)
		
	# Join the top A elements of the stack into one string
	elif M == "joinTop":
		result = "".join([e.value for e in stack.getTopItems(A)])
		for _ in range(A): stack.pop()
		stack.pushString(result)
		
	# Join A into one string
	elif M == "joinArray":
		result = "".join([str(i) for i in A])
		stack.pushString(result)
		
def IInsert(stack):
	modeList = [{
			"types" : [String, String, Integer],
			"name" : "insertAt"
		}, {
			"types" : [String, Integer, String],
			"name" : "insertPeriodic"
		},
	]
	M, C, B, A = stack.popArguments(modeList, 3)
	
	# Insert B into C after index A
	if M == "insertAt":
		index = A % len(C) + 1
		result = C[: index] + B + C[index :]
		stack.pushString(result)
		
	# Insert A after every Bth character in C
	elif M == "insertPeriodic":
		if B <= len(C):
			result = "".join([C[i : i+B] + A for i in range(0, len(C), B)])
			stack.pushString(result)
		else:
			stack.pushString(C)

	