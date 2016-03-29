import re
from errors import InvalidStackContentsException

def popArguments(stack, modeList, arity):
	"""
	Expects the stack, a modeList and an arity and returns the operands and the corrosponding mode  in the format
	[mode, operand1, operand2, ...]
	The modeList has the following format:
	[{"types" : [int, str, ...], "name" : modeName}, ...]
	Each list element represents a mode in which the command can work depending on the argument types on the stack
	"""
	
	if len(stack) < arity:
		message = "Expected %s items on the stack, but the stack only contains %s!" % (typeCount, len(stack))
		raise InvalidStackContentsException(message)

	# Take the top arity items from the stack
	topStack = stack[-arity:]
	topStackTypes = [type(i) for i in topStack]

	# Loop through all the modes and takes the first on that matches the stack types
	modeName = None
	for mode in modeList:
		if all(map(lambda t: t[0] == t[1], zip(topStackTypes, mode["types"]))):
			modeName = mode["name"]
			break
			
	if modeName:
		return [modeName] + [stack.pop() for i in range(arity)][::-1]
	else:
		typesList = [m["types"] for m in modeList]
		message =  "Excepted one of the types %s on the stack, but got %s!" % (typesList, topStackTypes)
		raise InvalidStackContentsException(message)
	
"""
The following functions take the stack as paramter, pop the needed arguments and push the result.
The stack gets mutated in place, so nothing is returned
A always refers to the top item, B to the item after that, etc.
"""
			
def IEval(stack):
	
	modeList = [{
			"types" : [str],
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
		
		stack.append(result)

	
def IReverse(stack):
	
	modeList = [{
			"types" : [str],
			"name" : "reverse"
		},
	]
	
	M, A = popArguments(stack, modeList, 1)
	
	# Reverses A
	if M == "reverse":
		result = A[::-1]
		
		stack.append(result)
		
	
def IStrip(stack):
	
	modeList = [{
			"types" : [str, str],
			"name" : "stripString"
		}, {
			"types" : [str, int],
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
		
		stack.append(result)
	
def IWrap(stack):
	
	modeList = [{
			"types" : [str],
			"name" : "wrap"
		},
	]
	
	M, A = popArguments(stack, modeList, 1)
	
	# Remove all newlines from A
	if M == "wrap":		
		result = "".join(re.split(r"\\n|\\r", A))
		
		stack.append(result)
	
	
def IReplace(stack):

	modeList = [{
			"types" : [str, str, str],
			"name" : "replace"
		}, 
	]
	
	M, C, B, A = popArguments(stack, modeList, 3)
	
	# Replaces all occurences of a regex pattern B with A in C
	if M == "replace":
		result = re.sub(B, A, C)
		
		stack.append(result)
		
		
def IMultiply(stack):
	
	modeList = [{
			"types" : [str, int],
			"name" : "multiply"
		},
	]
	
	M, B, A = popArguments(stack, modeList, 2)
	
	# Repeats every character in B A times
	if M == "multiply":
		result = "".join([c*A for c in B])
		
		stack.append(result)
