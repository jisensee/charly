import sys
import argparse
from interpreter import run
from errors import IposException
from iposTypes import String

if __name__ == "__main__":
	
	parser = argparse.ArgumentParser(description="A golfing language made for string processing.")
	parser.add_argument("code", help="The code that shall be executed.")
	parser.add_argument("-i", "--input", help="The input string which is initially placed on the stack.")
	args = parser.parse_args()
	
	if args.input:
		stack = [String(args.input)]
	else:
		stack = []
	
	try:
		print(run(args.code, stack))
	except IposException as e:
		print(e.message)
