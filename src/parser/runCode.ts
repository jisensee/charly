import { CommandNotExistingError } from '../errors'
import { Stack } from '../stack'
import { getTokenHandler } from './tokenHandlers'

/**
 * Runs the given code.
 * @param  {String} code The code to be run
 * @param  {Stack} pStack The initial stack that shall be used for the code
 * execution.
 * @return {Stack} The stack after the code has been run
 */
export function runCode(code: string, pStack: Stack): Stack {
  const stack = new Stack(pStack.content)
  let i = 0

  while (i < code.length) {
    const handler = getTokenHandler(code[i])
    if (handler) {
      i = handler.handle(stack, code, i)
    } else {
      throw new CommandNotExistingError(i, code[i])
    }
  }
  return stack
}
