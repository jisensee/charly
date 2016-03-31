#!/usr/bin/env python3

import argparse
import sys
from interpreter import run
from errors import IposException
from stack import Stack

if __name__ == "__main__":
	
	parser = argparse.ArgumentParser(description="A golfing language made for string processing.")
	parser.add_argument("code", help="The code that shall be executed.")
	parser.add_argument("-i", "--input", help="The input string which is initially placed on the stack.")
	parser.add_argument("-s", action="store_true")
	args = parser.parse_args()
	
	stack = Stack()
	
	if args.input:
		stack.pushString(args.input)
	elif args.s:
		stack.pushString("".join(sys.stdin.readlines()))
	
	try:
		# Run the code
		run(args.code, stack)
		
		# Join the stack into one string
		result = stack.join()
		
		print(result)
		
	except IposException as e:
		print("ERROR: %s" % e.message)
