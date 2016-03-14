from commandList import commandList, getCommand, isKnownCommand

class Parser:
	def __init__(self, code):
		self.code = code
		self.commands = []
	
	def getStringLiteral(self, start):
		"""
		Gets the next string literal which starts at the specified position.
		Returns the found literal.
		"""
		
		index = self.code.find("'", start)
		if index == -1:
			index = len(self.code) + 1
		return self.code[start : index]
		
	
	def parse(self):
		"""Transforms the code into commands and stores them in a list"""
		
		i = 0
		code = self.code
		#import pdb;pdb.set_trace()
		# loop through the code with i as index
		while i < len(code):
			# If we find a quote its an unbound string literal which gets appended to the current string
			if code[i] == "'":
				literal = self.getStringLiteral(i + 1)
				command = getCommand("")
				self.addCommand(command, [literal])
				# set index to the position after the literal
				i = len(literal) + 2
				
			# If we find a known command
			elif isKnownCommand(code[i]):
			
				command = code[i]
				i += 1				# set i on the next char in the code
				
				args = []				# stores all found literals
				literalFound = True		# becomes False when we found all literals
				
				# Loop as long as we find string literals and add them to args
				while literalFound:
				
					# If we find a literal add it to args and set i on the char after that
					if i < len(self.code) and code[i] == "'":
						literal = self.getStringLiteral(i + 1)
						i += len(literal) + 2
						args.append(literal)
					# Otherwise we leave the loop
					else:
						literalFound = False
				
				# Get the right Command-Object
				command = getCommand(command)
				
				highestArity = command.getHighestArity()
				# If we got more literals than needed for this command, keep the first needed ones and
				# reset i on the first not needed literal. If that is not the case, we can just keep them all
				if len(args) > highestArity:
					# We keep only the first needed ones and reset i on the first not needed literal
					args = args[:highestArity - 1]
					argLen = sum(map(lambda a:len(a), args)) + len(args) * 2
					i -= argLen
				
				# Finally add the command and its args to the list
				self.addCommand(command, args)
			else:
				raise Exception("'%s' is an unknown command!" % code[i])
				
				
	def addCommand(self, command, args):
		self.commands.append([command, args])
			
	def getCommands(self):
		"""Returns a list of 2-tuples (command, args)"""
		return self.commands