class Command:
	
	def __init__(self, name, function, arities):
		self.name = name
		self.function = function
		self.arities = arities
		
	def getName(self):
		"""Return the letter which represents this command"""
		return self.name
		
	def isValidArity(self, arity):
		"""Returns True if the command has the given arity, otherwise False"""
		return arity in self.arities
		
	def getHighestArity(self):
		"""Return the highest arity of this command"""
		return max(self.arities)
		
	def execute(self, s, args):
		"""
		Executes the command with the given args.
		Return the updated string.
		Raises an error if the amount of given args is not a valid arity.
		"""
		if self.isValidArity(len(args)):
			return self.function(s, *args)
		else:
			raise Exception("Wrong amount of args for command " + self.getName())