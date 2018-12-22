import {
  InvalidStackContentsError,
  MissingVariableNameError,
} from '../../errors'
import { Stack } from '../../stack'
import { assignVariable } from '../../variables'
import { TokenHandler } from '../tokenHandlers'
import { TOKEN_ASSIGN_VARIABLE } from '../tokens'

export const assignVariableHandler: TokenHandler = {
  canHandleToken(token: string): boolean {
    return token === TOKEN_ASSIGN_VARIABLE
  },
  handle(stack: Stack, code: string, index: number): number {
    if (index === code.length - 1) {
      throw new MissingVariableNameError(index)
    } else if (stack.size === 0) {
      throw new InvalidStackContentsError(
        `Empty stack at variable assignment at position ${index}!`,
      )
    } else {
      const variableName = code[index + 1]
      const variableValue = stack.getItem(stack.size - 1)
      assignVariable(variableName, variableValue)
      return index + 2
    }
  },
}
