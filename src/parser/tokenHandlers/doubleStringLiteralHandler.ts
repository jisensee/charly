import { MissingDoubleStringQuoteError } from '../../errors'
import { Stack } from '../../stack'
import { TokenHandler } from '../tokenHandlers'
import { TOKEN_DOUBLESTRING_LITERAL } from '../tokens'

export const doubleStringLiteralHandler: TokenHandler = {
  canHandleToken(token: string): boolean {
    return token === TOKEN_DOUBLESTRING_LITERAL
  },
  handle(stack: Stack, code: string, index: number): number {
    const secondQuoteIndex = code.indexOf('´', index + 1)

    if (secondQuoteIndex === -1) {
      throw new MissingDoubleStringQuoteError(index)
    }

    // Push the first string
    stack.pushString(code.slice(index + 1, secondQuoteIndex))

    // Find the last quote of the doublestring
    const thirdQuoteIndex = code.indexOf('´', secondQuoteIndex + 1)

    let secondString: string
    // If not found, 2nd string contains the rest of the code
    if (thirdQuoteIndex === -1) {
      secondString = code.slice(thirdQuoteIndex + 1)
      index = code.length
    } else {
      secondString = code.slice(secondQuoteIndex + 1, thirdQuoteIndex)
      index = thirdQuoteIndex + 1
    }
    stack.pushString(secondString)

    return index
  },
}
