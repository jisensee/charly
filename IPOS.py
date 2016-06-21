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
	parser.add_argument("-s", action="store_true", help="Take input from STDIN.")
	args = parser.parse_args()
	
	stack = Stack()
	
	input_ = None
	if args.input:
		input_ = args.input
	elif args.s:
		input_ = "".join(sys.stdin.readlines())
	
	# Convert input to unix style newlines and push it to the stack
	if input_:
		input_ = "".join(filter(lambda c: c != "\r", input_))
		stack.pushString(input_)
	
	try:
		# Run the code
		run(args.code, stack)
		
		# Join the stack into one string
		result = stack.join()
		
		print(result, end="")
		
	except IposException as e:
		print("ERROR: %s" % e.message)
