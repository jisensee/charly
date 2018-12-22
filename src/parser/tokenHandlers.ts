import { Stack } from '../stack'
import { assignVariableHandler } from './tokenHandlers/assignVariableHandler'
import { commandHandler } from './tokenHandlers/commandHandler'
import { commandLiteralHandler } from './tokenHandlers/commandLiteralHandler'
import { doubleStringLiteralHandler } from './tokenHandlers/doubleStringLiteralHandler'
import { integerLiteralHandler } from './tokenHandlers/integerLiteralHandler'
import { listLiteralHandler } from './tokenHandlers/listLiteralHandler'
import {
  regexLiteralHandler,
  stringLiteralHandler,
} from './tokenHandlers/multiCharLiteralHandlers'
import {
  singleCharCommandLiteralHandler,
  singleCharLiteralHandler,
} from './tokenHandlers/singleCharLiteralHandlers'
import { variableHandler } from './tokenHandlers/variableHandler'
import { whitespaceHandler } from './tokenHandlers/whitespaceHandler'

/**
 * Interface that represents a Tokenhandler
 */
export interface TokenHandler {
  /**
   * Check if this handler can handle the given token
   * @param token The token to be checked
   * @returns true if the handler can handle the token, false if not
   */
  canHandleToken(token: string): boolean

  /**
   * Handle the token given by an index in the code. Directly modifies the
   * given stack.
   * @param stack The stack on which to perform the handling
   * @param code The code
   * @param index The current position in the code
   * @returns The index of the next token to handle in the code
   */
  handle(stack: Stack, code: string, index: number): number
}

/**
 * Obtain a handler for the given token
 * @param token The token for which a handler should be obtained
 * @returns The handler for the token or null if there is none
 */
export function getTokenHandler(token: string): TokenHandler | null {
  const foundHandlers = tokenHandlers.filter(h => h.canHandleToken(token))

  if (foundHandlers.length > 0) {
    return foundHandlers[0]
  } else {
    return null
  }
}

const tokenHandlers: TokenHandler[] = [
  assignVariableHandler,
  commandLiteralHandler,
  doubleStringLiteralHandler,
  integerLiteralHandler,
  stringLiteralHandler,
  regexLiteralHandler,
  singleCharLiteralHandler,
  singleCharCommandLiteralHandler,
  listLiteralHandler,
  variableHandler,
  whitespaceHandler,
  commandHandler,
]
