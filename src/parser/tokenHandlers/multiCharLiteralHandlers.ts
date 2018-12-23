import { MissingCharacterError } from '../../errors'
import { Stack } from '../../stack'
import { CCommand, CItem, CPrimitive, CRegex, CString } from '../../types'
import { TokenHandler } from '../tokenHandlers'
import { TOKEN_REGEX_LITERAL, TOKEN_STRING_LITERAL } from '../tokens'

export const stringLiteralHandler: TokenHandler = {
  canHandleToken(token: string): boolean {
    return token === TOKEN_STRING_LITERAL
  },
  handle(stack: Stack, code: string, index: number): number {
    return handleMultiCharLiteral(
      stack,
      code,
      index,
      CString,
      TOKEN_STRING_LITERAL,
    )
  },
}

export const regexLiteralHandler: TokenHandler = {
  canHandleToken(token: string): boolean {
    return token === TOKEN_REGEX_LITERAL
  },
  handle(stack: Stack, code: string, index: number): number {
    return handleMultiCharLiteral(
      stack,
      code,
      index,
      CRegex,
      TOKEN_REGEX_LITERAL,
    )
  },
}

function handleMultiCharLiteral(
  stack: Stack,
  code: string,
  index: number,
  type: new (a: CPrimitive) => CItem,
  separator: string,
): number {
  const literalEnd = code.indexOf(separator, index + 1)

  let literal: string
  // If separator not found, the literal goes until the end of the code
  if (literalEnd === -1) {
    literal = code.slice(index + 1)
    index = code.length
  } else {
    literal = code.slice(index + 1, literalEnd)
    index = literalEnd + 1
  }

  stack.push(new type(literal))

  return index
}
