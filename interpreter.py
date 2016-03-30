from commands import commands
from errors import CommandNotExistingException, MissingCharacterException
from iposTypes import Integer, String


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
	stack.append(Integer(int(code[i : x])))
	
	return x
	

def handleCharLiteral(stack, code, index):
	"""
	Pushes the character literal at the given index to the stack.
	Returns the index of the first character after the character literal
	"""
	if index + 1 < len(code):
		stack.append(String(code[i + 1]))
		index += 2
	else:
		raise MissingCharacterException(index + 1)
		
	return index
	

def handleStringLiteral(stack, code, index):
	"""
	Pushes the string literal starting at the given index to the stack.
	Returns the index of the first character in the code ofter the string literal.
	"""
	quoteIndex = code.find("\"", index + 1)
	if quoteIndex == -1:
		stack.append(String(code[index + 1 :]))
		index = len(code)
	else:
		stack.append(String(code[index + 1 : quoteIndex]))
		index = quoteIndex + 1
		
	return index
	

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
	""""Runs the code with the given stack"""
	
	# loop through the code with i as index
	i = 0
	while i < len(code):
		# If current char is a digit, search the next non-digit char
		# and push all the digits between them to the stack as one integer literal
		if code[i].isdigit():
			i = handleIntegerLiteral(stack, code, i)
			
		# If the current char is a single quote we push the following
		# character to the stack as  a string literal
		elif code[i] == "'":
			i = handleCharLiteral(stack, code, i)
		
		# If the current char is a double quote, we search the ending one and push
		# the string between them to the stack. If there is no ending quote we take everything
		elif code[i] == "\"":
			i = handleStringLiteral(stack, code, i)
		
		# If current char is a space, find the next non-space char and point i on it
		elif code[i].isspace():
			i = handleSpace(code, i)
			
		# Current char is a command
		else:
			i = handleCommand(stack, code, i)
	
	return "".join([str(e) for e in stack])
