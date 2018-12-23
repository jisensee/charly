import { Stack } from '../stack'
import { CItem, CPrimitive } from '../types'

/**
 * Represents one command.
 */
export interface Command {
  /**
   * The key under which the command is called in the code. Must be unique.
   */
  key: string
  /**
   * The number of argument that this command consumes.
   */
  arity: number
  /**
   * The different modes that this command can execute. Modes are
   * distinguished by the type of their args. The order is relevant here,
   * the interpreter will execute the first mode that matches the stack
   * content.
   */
  modes: Mode[]
}

/**
 * The function which executes a mode.
 */
type ModeImplementationFunc = (stack: Stack, ...args: CItem[]) => void

/**
 * Represent one mode of a command.
 */
export interface Mode {
  /**
   * The name of the mode. Must be unique
   */
  name: string
  /**
   * The description of the mode.
   */
  description: string

  /**
   * The arguments that this mode requires. The top stack item is represented
   * by the last argument in the list.
   */
  args: Array<new (a: CPrimitive) => CItem>
  /**
   * The results that this mode leaves on the stack. The top stack item is
   * represented by the last result in the list.
   */
  results: Array<new (a: CPrimitive) => CItem>

  /**
   * Executes the mode.
   * Recieves the stack and the arguments of the mode. The arguments are in
   * the same order as specified by the mode with the last argument
   * representing the top stack item.
   * This function does not return anything, it directly manipulates the stack
   * that was passed into it.
   */
  execute: ModeImplementationFunc
}
