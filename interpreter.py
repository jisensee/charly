# endcoding: utf-8

from commands import commands
from errors import CommandNotExistingException, MissingCharacterException, InvalidVariableNameException, MissingDoubleStringQuoteException
from iposTypes import Integer, String, Command, Item


variables = {
	"B" : String("\n"),
	"E" : String(""),
	"L" : String("abcdefghijklmnopqrstuvwxyz"),
	"N" : String("0123456789"),
	"P" : String("."),
	"S" : String(" "),
	"T" : Integer(2),
	"U" : String("_"),
}

def handleMultiCharLiteral(stack, code, index, literalType):
	"""
	Pushes the literal starting at the given index to the stack as the given type.
	Returns the index of the first character after the literal.
	"""
	if literalType == String:
		seperator = "\""
	elif literalType == Command :
		seperator = "`"
		
	separatorIndex = code.find(seperator, index + 1)
	
	# If separator is not found, literal goes until the end of the code
	if separatorIndex == -1:
		result = code[index + 1 :]
		index = len(code)
	# Otherwise it goes untli the closing separator
	else:
		result = code[index + 1 : separatorIndex]
		index = separatorIndex + 1
		
	stack.push(literalType(result))
		
	return index
	
def handleSingleCharLiteral(stack, code, index, literalType):
	"""
	Pushes the literal at the position after the given index to the stack as the given type.
	Returns the index of the first character after the literal.
	"""
	if index + 1 < len(code):
		stack.push(literalType(code[index + 1]))
		index += 2
	else:
		raise MissingCharacterException(index + 1)
		
	return index

def handleDoubleStringLiteral(stack, code, index):
	"""
	Pushes the two string literals given by the doubstring starting at the given index.
	Returns the index of the first character after the multistring.
	"""
	secondQuote = code.find("´", index + 1)
	
	if secondQuote == -1:
		raise MissingDoubleStringQuoteException(index)
	
	# Push first string
	stack.pushString(code[index + 1 : secondQuote])
	
	# Find the last quote of the doublestring
	thirdQuote = code.find("´", secondQuote + 1)
	
	# If not found, 2nd string contains rest of the code
	if thirdQuote == -1:
		stack.pushString(code[secondQuote +1 :])
		return len(code)
	
	# If found, 2nd string contains chars until 3rd quote
	else:
		stack.pushString(code[secondQuote + 1 : thirdQuote])
		return thirdQuote + 1

def handleIntegerLiteral(stack, code, index):
	"""
	Pushes the integer literal starting at the given index to the stack.
	Returns the index of the first character after the integer literal.
	"""
	x = index
	while code[x].isdigit():
		x += 1
		if x == len(code):
			break
	stack.pushInteger(int(code[index : x]))
	
	return x

def handleSpace(code, index):
	"""
	Returns the index of the first non-whitespace character in the code
	starting at the given index
	"""
	while code[index].isspace():
		index += 1
		if index == len(code):
			break;
		
	return index
	
	
def handleVariable(stack, code, index):
	"""
	Pushes the value of the  the variable at the given index to the stack
	Returns the index of the next character in the code
	"""
	value = variables[code[index]]
	
	stack.push(value)
		
	return index + 1

	
def assignVariable(stack):
	modeList = [{
			"types" : [Item, String],
			"name" : "assignVariable"
		},
	]
	M, B, A = stack.popArguments(modeList, 2, unpack=False)
	
	# Assign the B to a variable named A and leaves the value of A on the stack
	if M == "assignVariable":
		if len(A.value) != 1:
			raise InvalidVariableNameException(A.value)
		else:
			variables[A.value] = B
			stack.push(B)


def handleCommand(stack, code, index):
	"""
	Executes the command at the given index in the code.
	Returns the index of the first character after the command
	"""
	if code[index] in commands:
		commands[code[index]](stack)
		index += 1
	else:
		raise CommandNotExistingException(index, code[index])
		
	return index


def run(code, stack):
	""""
	Runs the code with the given stack
	The stack is modified in-place but also gets returned
	"""
	
	# loop through the code with i as index
	i = 0
	while i < len(code):
		# Push an integer literal
		if code[i].isdigit():
			i = handleIntegerLiteral(stack, code, i)
			
		# Push single char string literal
		elif code[i] == "'":
			i = handleSingleCharLiteral(stack, code, i, String)
			
		# Push single char commands literal
		elif code[i] == "!":
			i = handleSingleCharLiteral(stack, code, i, Command)
		
		# Push multi char string literal
		elif code[i] == "\"":
			i = handleMultiCharLiteral(stack, code, i, String)
			
		# Push multi char commands literal
		elif code[i] == "`":
			i = handleMultiCharLiteral(stack, code, i, Command)
		
		# If current char is a space, find the next non-space char and point i on it
		elif code[i].isspace():
			i = handleSpace(code, i)
		
		# If current char is a variable, replace it with its value and set i to the next char		
		elif code[i] in variables:
			i = handleVariable(stack, code, i)
		
		# If the current char is equal sign, assign the 2nd top value to a variable given in the string at the top
		elif code[i] == "=":
			assignVariable(stack)
			i += 1
			
		# Push the two strings given by a doublestring literal
		elif code[i] == "´":
			i = handleDoubleStringLiteral(stack, code, i)
		
		# Current char is a command
		else:
			i = handleCommand(stack, code, i)
	
	return stack
