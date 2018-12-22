import { CommandNotFinishedError } from '../../errors'
import { Stack } from '../../stack'
import { findClosingBracketIndex } from '../findClosingBrace'
import { TokenHandler } from '../tokenHandlers'
import {
  TOKEN_END_COMMAND_LITERAL,
  TOKEN_START_COMMAND_LITERAL,
} from '../tokens'

export const commandLiteralHandler: TokenHandler = {
  canHandleToken(token: string): boolean {
    return token === TOKEN_START_COMMAND_LITERAL
  },
  handle(stack: Stack, code: string, index: number): number {
    const closingCommandIndex = findClosingBracketIndex(
      code,
      index,
      TOKEN_START_COMMAND_LITERAL,
      TOKEN_END_COMMAND_LITERAL,
    )

    if (!closingCommandIndex) {
      throw new CommandNotFinishedError(index)
    }

    stack.pushCommand(code.slice(index + 1, closingCommandIndex))

    return closingCommandIndex + 1
  },
}
