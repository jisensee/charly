import { MissingCharacterError } from '../../errors'
import { Stack } from '../../stack'
import { CCommand, CItem, CPrimitive, CString } from '../../types'
import { TokenHandler } from '../tokenHandlers'

export const singleCharLiteralHandler: TokenHandler = {
  canHandleToken(token: string): boolean {
    return token === "'"
  },
  handle(stack: Stack, code: string, index: number): number {
    return handleSingleCharLiteral(stack, code, index, CString)
  },
}

export const singleCharCommandLiteralHandler: TokenHandler = {
  canHandleToken(token: string): boolean {
    return token === '!'
  },
  handle(stack: Stack, code: string, index: number): number {
    return handleSingleCharLiteral(stack, code, index, CCommand)
  },
}

function handleSingleCharLiteral(
  stack: Stack,
  code: string,
  index: number,
  type: new (a: CPrimitive) => CItem,
): number {
  ++index
  if (index < code.length) {
    stack.push(new type(code[index]))
    return ++index
  } else {
    throw new MissingCharacterError(index)
  }
}
