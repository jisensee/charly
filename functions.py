import re
from errors import InvalidStackContentsException

def checkStack(stack, *typeList):
	"""
	Checks if the stack contains the given types starting at the top
	Raises InvalidStackContentsException if the types are not correct or
	if the amount of given types is greater than the amount of stack elements.
	Returns the top len(typeList) items from the stack as a list in the order top to bottom.
	"""
	typeCount = len(typeList)
	
	if len(stack) < typeCount:
		message = "Expected %s items on the stack, but the stack only contains %s!" % (typeCount, len(stack))
		raise InvalidStackContentsException(message)
	else:
		# Only take the last typeCount items from the stack, ordered top to bottom
		newStack = stack[-typeCount:][::1]
		stackTypes = [type(i) for i in newStack]
		
		if not all(map(lambda t: t[0] == t[1], zip(stackTypes, typeList))):
			message = "Excepted the types %s on the stack, but got %s!" % (typeList, stackTypes)
			raise InvalidStackContentsException(message)
		else:
			result = []
			for i in range(len(typeList)):
				result.append(stack.pop())
			
			return result[0] if len(result) == 1 else result

"""
The following functions take the stack as paramter, pop the needed arguments and push the result.
The stack gets mutated in place, so nothing is returned
A always refers to the top item, B to the item after that, etc.
"""
			
def IEval(stack):
	"""Executes the numeric calculations in A and pushes the result as int"""
	
	A = checkStack(stack, str)
	
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
	"""reversed(A)"""
	
	A = checkStack(stack, str)
	
	result = A[::-1]
	
	stack.append(result)
	
	
def IStrip(stack):
	"""A.strip(B)"""
	
	A, B = checkStack(stack, str, str)
	
	result = A.strip(B)
	
	stack.append(result)
	
	
def IWrap(stack):
	"""Removes all newlines from A"""
	
	A = checkStack(stack, str)
	
	result = "".join(re.split(r"\\n|\\r", A))
	
	stack.append(result)
	
	
def IReplace(stack):
	"""Replaces all occurences of a regex pattern B with C in A"""

	A = checkStack(stack, str, str)
	
	result = re.sub(B, C, A)
	
	stack.append(result)
		
		
def IMultiply(stack):
	"""Repeats every character in A B times"""
	
	A, B = checkStack(stack, str, int)
	
	result = "".join([c*B for c in A])
	
	stack.append(result)
