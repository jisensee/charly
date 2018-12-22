import { basicTextCommands } from './basicText'
import { Command } from './command'
import { stackCommands } from './stack'

const commands: Command[] = [...basicTextCommands, ...stackCommands]
export { commands }
