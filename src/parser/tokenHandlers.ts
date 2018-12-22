import { Stack } from '../stack'
import { assignVariableHandler } from './tokenHandlers/assignVariableHandler'
import { commandHandler } from './tokenHandlers/commandHandler'
import { commandLiteralHandler } from './tokenHandlers/commandLiteralHandler'
import { doubleStringLiteralHandler } from './tokenHandlers/doubleStringLiteralHandler'
import { integerLiteralHandler } from './tokenHandlers/integerLiteralHandler'
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

export interface TokenHandler {
  canHandleToken(token: string): boolean
  handle(stack: Stack, code: string, index: number): number
}

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
  commandHandler,
  commandLiteralHandler,
  doubleStringLiteralHandler,
  integerLiteralHandler,
  stringLiteralHandler,
  regexLiteralHandler,
  singleCharLiteralHandler,
  singleCharCommandLiteralHandler,
  variableHandler,
  whitespaceHandler,
]
