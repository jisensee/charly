import re

def IEval(s, *args):
	"""Executes the numeric calculations given by the input string"""
	
	# only keep chars for numeric calculations 
	s = "".join([c for c in s if c in "1234567890+-/*"])
	
	# remove leading zeros in number literals
	s = re.sub(r"0+(\d+)", r"\1", s)
	
	return str(eval(s));

def IReverse(s, *args):
	"""Reverses the string"""
	return s[::-1]
	
def IStrip(s, *args):
	"""Removes leading and trailing whitespaces"""
	
	# No arguments -> Just strip whitespaces
	if len(args) == 0:
		return s.strip()
	elif len(args) == 1:
		return s.strip(args[0])
	
def IWrap(s, *args):
	"""Removes all newlines"""
	return "".join(re.split(r"\\n|\\r", s))
	
def IReplace(s, *args):
	"""Replaces all occurences of a pattern"""

	# Replacement is given
	if len(args) == 2 and isinstance(args[0], str) and isinstance(args[1], str):
		return re.sub(args[0], args[1], s)
	
def IAppendString(s, toAppeand):
	"""Appends the given string"""
	return s + toAppend[0]