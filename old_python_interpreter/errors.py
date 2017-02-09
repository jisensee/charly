class IposException(Exception):
	def __init__(self):
		self.message = "IposException: "


class CommandNotExistingException(IposException):
	def __init__(self, index, command):
		super().__init__()
		self.message += "The command '%s' at position %s does not exist!" % (command, index)

		
class MissingCharacterException(IposException):
	def __init__(self, index):
		super().__init__()
		self.message += "Expected a character at position %s!" % index

		
class InvalidStackContentsException(IposException):
	def __init__(self, message):
		super().__init__()
		self.message += message

		
class InvalidVariableNameException(IposException):
	def __init__(self, variableName):
		self.message = "The name of a variable can't be longer than one character, but it was %s characters long!" % len(variableName)
		

class InvalidEvalStringException(IposException):
	def __init__(self, evalString):
		self.message = "The string '%s' can't be evaluated because of a syntax error!" % evalString
		
class MissingDoubleStringQuoteException(IposException):
	def __init__(self, index):
		self.message = "The double string starting at position %s is missing the second quote!" % index
		
class CommandNotFinishedException(IposException):
	def __init__(self, startIndex):
		self.message = "The command started at index %s is not closed!" % startIndex