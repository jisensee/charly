import { ListNotFinishedError } from '../../errors'
import { Stack } from '../../stack'
import { CList } from '../../types'
import { findClosingBracketIndex } from '../findClosingBrace'
import { runCode } from '../runCode'
import { TokenHandler } from '../tokenHandlers'
import { TOKEN_END_LIST_LITERAL, TOKEN_START_LIST_LITERAL } from '../tokens'

export const listLiteralHandler: TokenHandler = {
  canHandleToken(token: string): boolean {
    return token === TOKEN_START_LIST_LITERAL
  },
  handle(stack: Stack, code: string, index: number): number {
    const closingListIndex = findClosingBracketIndex(
      code,
      index,
      TOKEN_START_LIST_LITERAL,
      TOKEN_END_LIST_LITERAL,
    )

    if (!closingListIndex) {
      throw new ListNotFinishedError(index)
    }

    const listStack = new Stack()
    const listInitCode = code.slice(index + 1, closingListIndex)

    runCode(listInitCode, listStack)

    const list = listStack.popItems()
    stack.pushList(list)

    return closingListIndex + 1
  },
}
