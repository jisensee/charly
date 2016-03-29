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
