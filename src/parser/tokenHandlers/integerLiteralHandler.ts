import { Stack } from '../../stack'
import { TokenHandler } from '../tokenHandlers'

function isDigit(s: string): boolean {
  return s.length === 1 && '0123456789'.indexOf(s) > -1
}

export const integerLiteralHandler: TokenHandler = {
  canHandleToken(token: string): boolean {
    return isDigit(token)
  },
  handle(stack: Stack, code: string, index: number): number {
    let x = index
    while (x < code.length && isDigit(code[x])) {
      ++x
    }
    stack.pushInteger(parseInt(code.slice(index, x), 10))

    return x
  },
}
