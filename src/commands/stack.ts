import { InvalidStackContentsError } from '../errors'
import { Stack } from '../stack'
import { CInteger, CItem } from '../types'
import { Command } from './command'

const stackCommands: Command[] = [
  {
    key: '/',
    arity: 2,
    modeList: [
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
  },
  {
    key: '_',
    arity: 1,
    modeList: [
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
  },
  {
    key: ';',
    arity: 1,
    modeList: [
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
  },
  {
    key: '@',
    arity: 3,
    modeList: [
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
  },
  {
    key: '$',
    arity: 1,
    modeList: [
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
  },
]

export { stackCommands }
