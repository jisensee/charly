from functions import *
from command import Command

commandList = [
	Command("", IAppendString, [1]),
	Command("e", IEval, [0]),
	Command("r", IReverse, [0]),
	Command("s", IStrip, [0, 1]),
	Command("w", IWrap, [0]),
	Command("R", IReplace, [0, 1, 2]),
]

def isKnownCommand(command):
	"""Return True if the given Command is implemented, otherwise False"""
	return command in map(lambda c:c.getName(), commandList)

def getCommand(name):
		"""
		Returns the Command-Object with the given name
		Does NOT check if  a command with this name exists, 
		this must be ensured before calling this function
		"""
		return filter(lambda c: c.getName() == name, commandList).__next__()