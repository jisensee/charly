from commands import commands
from errors import CommandNotExistingException, MissingCharacterException, IposException

def run(code, stack):
	""""Runs the code with the given stack"""
	
	# loop through the code with i as index
	i = 0
	while i < len(code):
		# If current char is a digit, search the next non-digit char
		# and push all the digits between to the stack as one integer literal
		if code[i].isdigit():
			x = i
			while code[x].isdigit():
				x += 1
				if x == len(code):
					break
			stack.append(int(code[i : x]))
			# set i on the non-digit char for the next iteration
			i = x
			
		# If the current char is a single quote we push the following
		# character to the stack as  a string literal
		elif code[i] == "'":
			if i + 1 < len(code):
				stack.append(code[i + 1])
				i += 2
			else:
				raise MissingCharacterException(i + 1)
		
		# If the current char is a double quote, we search the ending one and push
		# the string between them to the stack. If there is no ending quote we take everything
		elif code[i] == "\"":
			index = code.find("\"", i+1)
			if index == -1:
				stack.append(code[i+1 :])
				i = len(code)
			else:
				stack.append(code[i+1 : index])
				i = index + 1
		
		# If current char is a space, find the next non-space char and point i on it
		elif code[i].isspace():
			x = i
			while code[x].isspace():
				x += 1
				if x == len(code):
					break;
			i = x
			
		# Current char is a command
		else:
			if code[i] in commands:
				commands[code[i]](stack)
				i += 1
			else:
				raise CommandNotExistingException(i, code[i])
	
	return "".join([str(e) for e in stack])
