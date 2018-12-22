import { Stack } from '../../stack'
import { getVariable } from '../../variables'
import { TokenHandler } from '../tokenHandlers'

export const variableHandler: TokenHandler = {
  canHandleToken(token: string): boolean {
    return getVariable(token) !== null
  },
  handle(stack: Stack, code: string, index: number): number {
    const variable = getVariable(code[index])
    // If should always be executed, otherwise this handler would not be called
    if (variable) {
      stack.push(variable.value)
      return index + 1
    } else {
      throw new Error(
        `Variable ${code[index]} not found. Something went very wrong!`,
      )
    }
  },
}
