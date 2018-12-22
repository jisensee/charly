import { Stack } from '../../stack'
import { TokenHandler } from '../tokenHandlers'

export const whitespaceHandler: TokenHandler = {
  canHandleToken(token: string): boolean {
    return isWhitespace(token)
  },
  handle(stack: Stack, code: string, index: number): number {
    while (isWhitespace(code[index]) && index < code.length) {
      ++index
    }
    return index
  },
}

function isWhitespace(s: string): boolean {
  return /\s/.test(s)
}
