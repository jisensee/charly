import { Command } from 'charly/command'
import { Stack } from 'charly/stack'
import { CInteger, CItem, CList } from 'charly/types'

const v: Command = {
  key: 'v',
  arity: 1,
  modes: [
    {
      name: 'lastElement',
      description:
        'Pushes the last element from A. Pushes nothing if A is empty.',
      args: [CList],
      results: [CItem],
      execute(stack: Stack, A: CList): void {
        if (A.value.length > 0) {
          stack.push(A.value[A.value.length - 1])
        }
      },
    },
    {
      name: 'decrement',
      description: 'Decrements A.',
      args: [CInteger],
      results: [CInteger],
      execute(stack: Stack, A: CInteger): void {
        stack.pushInteger(A.value - 1)
      },
    },
  ],
}
export { v }
