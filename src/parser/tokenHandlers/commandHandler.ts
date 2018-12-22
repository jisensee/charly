import { commands } from '../../commands/_allCommands'
import { Command } from '../../commands/command'
import {
  CommandNotExistingError,
  InvalidStackContentsError,
} from '../../errors'
import { Stack } from '../../stack'
import { TokenHandler } from '../tokenHandlers'

export const commandHandler: TokenHandler = {
  canHandleToken(token: string): boolean {
    return getMatchingCommand(token) !== null
  },
  handle(stack: Stack, code: string, index: number): number {
    const command = getMatchingCommand(code[index])

    if (command) {
      const arity = command.arity

      if (stack.size < arity) {
        const message = `Expected ${arity} items on the stack, but the
 stack only contains ${stack.size}!`
        throw new InvalidStackContentsError(message)
      }

      const topStackItems = stack.getTopItems(arity)

      // Find first mode that fits to the top stack types
      const matchingModes = command.modeList.filter(mode =>
        topStackItems.every(
          (value, eIndex) => value instanceof mode.args[eIndex],
        ),
      )

      if (matchingModes.length > 0) {
        const args = stack.popItems(arity)
        matchingModes[0].execute(stack, ...args)

        return index + 1
      } else {
        const typesList = command.modeList.map(mode => mode.args)

        const topStackTypes = topStackItems.map(i => i.typeName)
        const message = `Expected one of the types ${typesList} on the
 stack but got ${topStackTypes}`
        throw new InvalidStackContentsError(message)
      }
    } else {
      throw new CommandNotExistingError(index, code[index])
    }
  },
}

function getMatchingCommand(token: string): Command | null {
  const matchingCommands = commands.filter(cmd => cmd.key === token)
  if (matchingCommands.length > 0) {
    return matchingCommands[0]
  } else {
    return null
  }
}
