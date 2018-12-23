import { InvalidStackContentsError } from '../errors'
import { Stack } from '../stack'
import { CInteger, CItem } from '../types'
import { Command } from './command'

const swap: Command = {
  key: '/',
  arity: 2,
  modes: [
    {
      name: 'swap',
      description: 'Swaps the top two stack items.',
      args: [CItem, CItem],
      results: [],
      execute(stack: Stack, B: CItem, A: CItem): void {
        stack.push(A)
        stack.push(B)
      },
    },
  ],
}

const discard: Command = {
  key: ';',
  arity: 1,
  modes: [
    {
      name: 'discard',
      description: 'Discards the top stack item.',
      args: [CItem],
      results: [],
      execute(stack: Stack, A: CItem): void {
        // Do nothing, item has already been popped from the stack
      },
    },
  ],
}

const duplicate: Command = {
  key: '_',
  arity: 1,
  modes: [
    {
      name: 'duplicate',
      description: 'Duplicates the top stack item.',
      args: [CItem],
      results: [CItem, CItem],
      execute(stack: Stack, A: CItem): void {
        stack.push(A)
        stack.push(A)
      },
    },
  ],
}

const copy: Command = {
  key: '$',
  arity: 1,
  modes: [
    {
      name: 'copy',
      description:
        'Copies the item with the index A to the top of the stack. Index 0 is the item on the bottom of the stack.',
      args: [CInteger],
      results: [],
      execute(stack: Stack, A: CInteger): void {
        if (stack.size === 0) {
          throw new InvalidStackContentsError(
            "Can't copy if the stack if empty!",
          )
        } else {
          const result = stack.getItem(A.value % stack.size)
          stack.push(result)
        }
      },
    },
  ],
}

const rotate: Command = {
  key: '@',
  arity: 3,
  modes: [
    {
      name: 'rotate',
      description:
        'Pushes the 3rd item to the top and shifts the other two down.',
      args: [CItem, CItem, CItem],
      results: [],
      execute(stack: Stack, C: CItem, B: CItem, A: CItem): void {
        stack.push(B)
        stack.push(A)
        stack.push(C)
      },
    },
  ],
}

export const stackCommands = [swap, discard, duplicate, copy, rotate]
