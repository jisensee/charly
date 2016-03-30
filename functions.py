import re
import random

from errors import InvalidStackContentsException
from iposTypes import *

def popArguments(stack, modeList, arity, unpack = True):
	"""
	Expects the stack, a modeList and an arity and returns the operands and the corrosponding mode  in the format
	[mode, operand1, operand2, ...]
	If unpack is True the values of the items are returned, otherwise the instances of the respective types are retuned
	The modeList has the following format:
	[{"types" : [int, str, ...], "name" : modeName}, ...]
	Each list element represents a mode in which the command can work depending on the argument types on the stack
	"""
	
	if len(stack) < arity:
		message = "Expected %s items on the stack, but the stack only contains %s!" % (arity, len(stack))
		raise InvalidStackContentsException(message)

	# Take the top arity items from the stack
	topStack = stack[-arity:]
	topStackTypes = [type(i) for i in topStack]

	# Loop through all the modes and takes the first on that matches the stack types
	modeName = None
	for mode in modeList:
		if all(map(lambda t: isinstance(t[0], t[1]) , zip(topStack, mode["types"]))):
			modeName = mode["name"]
			break
			
	if modeName:
		return [modeName] + [stack.pop().value if unpack else stack.pop() for i in range(arity)][::-1]
	else:
		typesList = [m["types"] for m in modeList]
		message =  "Excepted one of the types %s on the stack, but got %s" % (typesList, topStackTypes)
		raise InvalidStackContentsException(message)

	
def IClearStack(stack):
	"""Clears the stack"""
	del stack[:]
	
	
def IDuplicateTopStackItem(stack):
	modeList = [{
			"types" : [Item],
			"name" : "duplicate"
		},
	]
	
	M, A = popArguments(stack, modeList, 1, unpack=False)
	
	# Duplicate the top item on the stack
	if M == "duplicate":
		stack.append(A)
		stack.append(A)
		
		
def ICopyStackItem(stack):
	modeList = [{
			"types" : [Integer],
			"name" : "copy"
		},
	]
	
	M, A = popArguments(stack, modeList, 1, unpack=False)
	
	if M == "copy":
		result = stack[A % len(stack)]
		stack.append(result)
		
		
def ISwapTopStackItems(stack, unpack=False):
	modeList = [{
			"types" : [Item, Item],
			"name" : "swap"
		},
	]
	
	M, B, A = popArguments(stack, modeList, 2, unpack=False)
	
	if M == "swap":
		stack.append(A)
		stack.append(B)
		
	
def IRotateTopStack(stack, unpack=False):
	modeList = [{
			"types" : [Item, Item, Item],
			"name" : "rotate"
		},
	]
	
	M, C, B, A = popArguments(stack, modeList, 3)
	
	if M == "rotate":
		stack.append(B)
		stack.append(A)
		stack.append(C)
		
def IReverseStack(stack, unpack=False):
	"""Reverses the stack"""
	stack.reverse()

def IDiscardTopStackItem(stack):
	modeList = [{
			"types" : [Item],
			"name" : "discard"
		},
	]
	
	M, A = popArguments(stack, modeList, 1)
	
	# Top item already got popped, nothing to do
	if A == "discard":
		pass
		
		"""
The following functions take the stack as paramter, pop the needed arguments and push the result.
The stack gets mutated in place, so nothing is returned
A always refers to the top item, B to the item after that, etc.
"""
			
def IEval(stack):
	
	modeList = [{
			"types" : [String],
			"name" : "eval"
		},
	]
	
	M, A = popArguments(stack, modeList, 1)

	# Executes the numeric calculations in A and pushes the result as int
	if M == "eval":		
		# only keep chars for numeric calculations 
		allowedChars = "1234567890+-/*"
		result = "".join([c for c in A if c in allowedChars])
		
		# remove leading zeros in number literals
		result = re.sub(r"0+(\d+)", r"\1", result)
		
		# Replace float through integer division
		result = re.sub(r"[^/]/[^/]", "//", result)
		
		result = eval(result)
		
		stack.append(String(result))

	
def IReverse(stack):
	
	modeList = [{
			"types" : [String],
			"name" : "reverse"
		},
	]
	
	M, A = popArguments(stack, modeList, 1)
	
	# Reverses A
	if M == "reverse":
		result = A[::-1]
		
		stack.append(String(result))
		
	
def IStrip(stack):
	
	modeList = [{
			"types" : [String, String],
			"name" : "stripString"
		}, {
			"types" : [String, Integer],
			"name" : "stripInt"
		}
	]
	
	M, B, A = popArguments(stack, modeList, 2)
	
	# Remove leading and trailing  As from B
	if M == "stripString":
		result = B.strip(A)
		
		stack.append(result)
		
	# Remove A leading and trailing chars from B
	elif M == "stripInt":
		result = B[A : -A]
		
		stack.append(String(result))
	
def IWrap(stack):
	
	modeList = [{
			"types" : [String],
			"name" : "wrap"
		},
	]
	
	M, A = popArguments(stack, modeList, 1)
	
	# Remove all newlines from A
	if M == "wrap":		
		result = "".join(re.split(r"\\n|\\r", A))
		
		stack.append(String(result))
	
	
def IReplace(stack):

	modeList = [{
			"types" : [String, String, String],
			"name" : "replace"
		}, 
	]
	
	M, C, B, A = popArguments(stack, modeList, 3)
	
	# Replaces all occurences of a regex pattern B with A in C
	if M == "replace":
		result = re.sub(B, A, C)
		
		stack.append(String(result))
		
		
def IMultiply(stack):
	
	modeList = [{
			"types" : [String, Integer],
			"name" : "multiply"
		},
	]
	
	M, B, A = popArguments(stack, modeList, 2)
	
	# Repeats every character in B A times
	if M == "multiply":
		result = "".join([c*A for c in B])
		
		stack.append(String(result))
		

def ISwapCase(stack):

	modeList = [{
			"types" : [String],
			"name" : "swapCase"
		},
	]
	
	M, A = popArguments(stack, modeList, 1)
	
	if M == "swapCase":
		result = A.swapcase()
		stack.append(String(result))
		
		
def IPushCommands(stack):
	
	modeList = [{
			"types" : [String],
			"name" : "pushCommands"
		},
	]
	
	M, A = popArguments(stack, modeList, 1)
	
	# Convert A to a Commands-object
	if M == "pushCommands":
		result = Commands(A)
		
		stack.append(result)
	
def IExecuteCommands(stack):
	from interpreter import run
	
	modeList = [{
		"types" : [Commands],
		"name" : "executeCommands"
		},
	]
	
	M, A = popArguments(stack, modeList, 1)
	
	# Execute the given commands using and manipulating the stack
	if M == "executeCommands":
		run(A, stack)

	
def applyCommands(commands, inputStr, rand = False):
	"""
	Helper function for the map commands.
	Executes the given commands with the given input-string and returns the joined stack.
	If random is True, then the commands only get executed with a 50% chance.
	"""
	from interpreter import run, joinStack
	
	stack = [String(inputStr)]
	
	if rand and random.choice([0, 1]) or not rand:
		result = joinStack(run(commands, stack))
	else:
		result = joinStack(stack)
	

	return result
	
def IApplyToChars(stack):
	
	modeList = [{
			"types" : [String, Commands],
			"name" : "applyToChars",
		}
	]
	
	M, B, A = popArguments(stack, modeList, 2)
	
	# Apply A to every character of B
	if M == "applyToChars":
		result = "".join(map(lambda c: applyCommands(A, c), B))
		
		stack.append(String(result))
		
	
def IApplyToParts(stack):
	
	modeList = [{
			"types" : [String, String, Commands],
			"name" : "applyToParts",
		}
	]
	
	M, C, B, A = popArguments(stack, modeList, 3)
	
	# Apply A to every element of C.split(B)
	if M == "applyToParts":
		splittedStr = C if B == "" else C.split(B)
		
		result = B.join(map(lambda c: applyCommands(A, c), splittedStr))
		
		stack.append(String(result))
	
	
def IApplyToPartsRandomly(stack):
	
	modeList = [{
			"types" : [String, String, Commands],
			"name" : "applyToPartsRandomly",
		}
	]
	
	M, C, B, A = popArguments(stack, modeList, 3)
	
	# Apply A to every element of C.split(B)
	if M == "applyToPartsRandomly":
		splittedStr = C if B == "" else C.split(B)
		
		result = B.join(map(lambda c: applyCommands(A, c, rand = True), splittedStr))
		
		stack.append(String(result))