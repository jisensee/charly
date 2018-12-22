import { CommandNotFinishedError } from '../../errors'
import { Stack } from '../../stack'
import { TokenHandler } from '../tokenHandlers'
import { TOKEN_START_COMMAND_LITERAL } from '../tokens'

export const commandLiteralHandler: TokenHandler = {
  canHandleToken(token: string): boolean {
    return token === TOKEN_START_COMMAND_LITERAL
  },
  handle(stack: Stack, code: string, index: number): number {
    // Set the index to the first char in the command
    ++index
    // Save the start of the command
    const start = index
    let openingBraces = 0
    let endFound = false

    while (!endFound) {
      // Throw error when we reach the end without a closing brace
      if (index === code.length) {
        throw new CommandNotFinishedError(start)
      } else if (code[index] === '{') {
        /*
        If we find an opening brace, we increase the counter,
        so we need one more closing one
        */
        ++openingBraces
      } else if (code[index] === '}' && openingBraces > 0) {
        // If we find a closing brace that closes another nested command
        --openingBraces
      } else if (code[index] === '}' && openingBraces === 0) {
        // If we find the closing brace that ends the command
        endFound = true
      }
      ++index
    }
    stack.pushCommand(code.slice(start, index - 1))

    return index
  },
}
