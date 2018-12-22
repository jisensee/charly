import { Stack } from '../../stack'
import { variables } from '../../variables'
import { TokenHandler } from '../tokenHandlers'

export const variableHandler: TokenHandler = {
  canHandleToken(token: string): boolean {
    return variables[token]
  },
  handle(stack: Stack, code: string, index: number): number {
    stack.push(variables[code[index]])
    return index + 1
  },
}
