from iposTypes import Integer, String, Command
from errors import InvalidStackContentsException

class Stack:
	"""Represents one stack"""
	
	def __init__(self, initialContent=[]):
		"""
		Initialize the stack with the given contents.
		If content is not given the stack is empty.
		"""
		self.content = initialContent

	def join(self):
		""""Converts every item to string and joins them bottom to top."""
		return "".join([str(i.value) for i in self.content])

	def pushString(self, string):
		"""Push a string to the stack"""
		self.content.append(String(string))

	def pushInteger(self, integer):
		"""Push an integer to the stack"""
		self.content.append(Integer(integer))

	def pushCommand(self, command):
		"""Push a command to the stack"""
		self.content.append(Command(command))

	def push(self, item):
		"""
		Push the item as it is to the stack.
		It has to be ensured that it is already one of the IposTypes.
		"""
		self.content.append(item)

	def popArguments(self, modeList, arity, unpack=True):
		"""
		Expects a modeList and an arity and returns the operands and the corrosponding mode	 in the format
		[mode, operand1, operand2, ...]
		If unpack is True the values of the items are returned, otherwise the instances of the respective types are retuned.
		The modeList has the following format:
		[{"types" : [int, str, ...], "name" : modeName}, ...]
		Each list element represents a mode in which the command can work depending on the argument types on the stack
		"""
		
		if self.getLength() < arity:
			message = "Expected %s items on the stack, but the stack only contains %s!" % (arity, self.getLength())
			raise InvalidStackContentsException(message)

		# Take the top arity items from the stack
		topStack = self.getTopItems(arity)
		topStackTypes = [type(i) for i in topStack]

		# Loop through all the modes and takes the first on that matches the stack types
		modeName = None
		for mode in modeList:
			if all(map(lambda t: isinstance(t[0], t[1]) , zip(topStack, mode["types"]))):
				modeName = mode["name"]
				break
				
		if modeName:
			return [modeName] + [self.pop().value if unpack else self.pop() for i in range(arity)][::-1]
		else:
			typesList = [m["types"] for m in modeList]
			message =  "Excepted one of the types %s on the stack, but got %s" % (typesList, topStackTypes)
			raise InvalidStackContentsException(message)

	def pop(self):
		"""Returns the top element from the stack and removes it"""
		return self.content.pop()

	def getItem(self, index):
		"""Returns the item at the given index."""
		return self.content[index]

	def getTopItems(self, count):
		"""
		Returns the given amount of items from the top.
		The top item is last in this list.
		"""
		return self.content[-count:]

	def getLength(self):
		"""Returns the amount of items in the stack"""
		return len(self.content)
