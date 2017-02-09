import Stack from "./stack"
import * as types from "./types"
import commands from "./commands/_allCommands"
import variables from "./variables"
import {CommandNotExistingError, MissingCharacterError, MissingVariableNameError,
  InvalidStackContentsError, MissingDoubleStringQuoteError, CommandNotFinishedError} from "./errors"

function isDigit(s) {
  return !![1, 1, 1, 1, 1, 1, 1, 1, 1, 1][s]
}

function isWhitespace(s) {
  return /\s/.test(s)
}

/**
 * Runs the given code.
 * @param  {String} code  The code to be run
 * @param  {Stack} pStack The initial stack that shall be used for the code execution.
 * @return {Stack}        The stack after the code has been run
 */
export default function(code, pStack) {
  const stack = new Stack(pStack.content)
  let i = 0

  while(i < code.length) {
    let c = code[i]

    if(isDigit(c)) {
      i = handleIntegerLiteral(stack, code, i)
    } else if(c === `'`) {
      i = handleSingleCharLiteral(stack, code, i, types.String)
    } else if(c === `!`) {
      i = handleSingleCharLiteral(stack, code, i, types.Command)
    } else if(c === `"`) {
      i = handleMultiCharLiteral(stack, code, i, types.String, c)
    } else if(c === "`") {
      i = handleMultiCharLiteral(stack, code, i, types.Regex, c)
    } else if(c === `{`) {
      i = handleCommandLiteral(stack, code, i)
    } else if(isWhitespace(c)) {
      i = handleSpace(code, i)
    } else if(variables[c]) {
      i = handleVariable(stack, code, i)
    } else if(c === `´`) {
      i = handleDoubleStringLiteral(stack, code, i)
    } else if(c === `=`) {
      i = assignVariable(stack, code, i)
    } else {
      i = handleCommand(stack, code, i)
    }
  }

  return stack
}

/**
 * Pushes the integer literal starting at the given index to the stack.
 * Returns the index of the first character after the integer literal.
 */
function handleIntegerLiteral(stack, code, index) {
  let x = index
  while(isDigit(code[x]) && x < code.length) {
    ++x;
   }

  stack.pushInteger(parseInt(code.slice(index, x)))

  return x
}

/**
 * Pushes the literal at the position after the given index to the stack as the given type.
 * Returns the index of the first character after the literal.
 */
function handleSingleCharLiteral(stack, code, index, type) {
  ++index
  if(index < code.length) {
    stack.push(new type(code[index]))
    return ++index
  } else {
    throw new MissingCharacterError(index)
  }
}

/**
 * Pushes the literal starting at the given index to the stack as the given type.
 * Returns the index of the first character after the literal.
 */
function handleMultiCharLiteral(stack, code, index, type, separator) {
  const literalEnd = code.indexOf(separator, index + 1)

  let literal
  // If the separator is not found, the literal goes until the end of the code
  if(literalEnd === -1) {
    literal = code.slice(index + 1)
    index = code.length
  } else {
    literal = code.slice(index + 1, literalEnd)
    index = literalEnd + 1
  }

  stack.push(new type(literal))

  return index
}

/**
 * Pushes a new command-literal to the stack.
 * Returns the index of the next command in the code.
 */
function handleCommandLiteral(stack, code, index) {
  // Set the index to the first char in the command
	++index
	// Save the start of the command
	const start = index
	// Counts the opening braces we encounter so we don't end the command too early
	let openingBraces = 0
	// Becomes true when we find the end of the command
  let endFound = false

  while(!endFound) {
    // Throw error when we reach the end without a closing brace
		if(index === code.length) {
			throw new CommandNotFinishedError(start)
    }	else if(code[index] === `{`) {
      // If we find an opening brace, we increase the counter, so we need one more closing one
			++openingBraces
    }	else if(code[index] === `}` && openingBraces > 0) {
      // If we find a closing brace that closes another nested command
			--openingBraces
    }	else if(code[index] === `}` && openingBraces == 0) {
      // If we find the closing brace that ends the command
			endFound = true
    }
    ++index
  }

  stack.pushCommand(code.slice(start, index - 1))

  return index
}

/**
 * Returns the index of the first non-whitespace character in the code starting at the given index.
 */
function handleSpace(code, index) {
  while(isWhitespace(code[index]) && index < code.length) ++index;
  return index
}

/**
 * Pushes the two string literals given by the doubstring starting at the given index.
 * Returns the index of the first character after the multistring.
 */
function handleDoubleStringLiteral(stack, code, index) {
  const secondQuoteIndex = code.indexOf(`´`, index + 1)

  if(secondQuoteIndex === -1) {
    throw new MissingDoubleStringQuoteError(index)
  }

  // Push the first string
  stack.pushString(code.slice(index + 1, secondQuoteIndex))

  // Find the last quote of the doublestring
  const thirdQuoteIndex = code.indexOf(`´`, secondQuoteIndex + 1)

  let secondString
  // If not found, 2nd string contains the rest of the code
  if(thirdQuoteIndex === -1) {
    secondString = code.slice(thirdQuoteIndex + 1)
    index = code.length
  } else {
    secondString = code.slice(secondQuoteIndex + 1, thirdQuoteIndex)
    index = thirdQuoteIndex + 1
  }
  stack.pushString(secondString)

  return index
}

/**
 * Executes the command at the given index in the code.
 * Returns the index of the first character after the command
 */
function handleCommand(stack, code, index) {
  const command = commands.find(c => c.key === code[index])
  if(command) {
    command.run(stack)
    return index + 1
  } else {
    throw new CommandNotExistingError(index, code[index])
  }
}

/**
 * Pushes the value of the variable at the given index to the stack.
 * Returns the index of the next character in the code.
 */
function handleVariable(stack, code, index) {
  stack.push(variables[code[index]])
  return index + 1
}

/**
 * Assigns the top item of the stack to the variable name given after the `=`
 * Returns the index of the next character in the code.
 */
function assignVariable(stack, code, index) {
  if(index === code.length - 1) {
    throw new MissingVariableNameError(index)
  } else if(stack.size === 0) {
    throw new InvalidStackContentsError(`Empty stack at variable assignment at position ${index}!`)
  } else {
    const variableName = code[index + 1]
    const variableValue = stack.getItem(stack.size - 1)
    variables[variableName] = variableValue
    return index + 2
  }
}
