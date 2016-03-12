import sys
import argparse

from IPOSParser import Parser

def run(code, s):
	parser = Parser(code)
	parser.parse()
	
	for command, args in parser.getCommands():
		s = command.execute(s, args)
	
	return s


if __name__ == "__main__":
	
	parser = argparse.ArgumentParser(description="A golfing language made for string processing.")
	parser.add_argument("code", help="The code that shall be executed.")
	parser.add_argument("-i", "--input", help="The input string that shall be processed. If not given input will be taken from STDIN.")
	args = parser.parse_args()
	
	code = args.code
	
	if args.input:
		s = args.input
	else:
		s = "".join(sys.stdin.readlines())
	
	print(run(code, s))
