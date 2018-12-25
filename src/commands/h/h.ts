import { Command } from 'charly/command'
import { Stack } from 'charly/stack'
import { CInteger, CItem, CList } from 'charly/types'

const h: Command = {
  key: 'h',
  arity: 1,
  modes: [
    {
      name: 'firstElement',
      description:
        'Pushes the first element of A. Pushes nothing if A is empty.',
      args: [CList],
      results: [CItem],
      execute(stack: Stack, A: CList): void {
        if (A.value.length > 0) {
          stack.push(A.value[0])
        }
      },
    },
    {
      name: 'increment',
      description: 'Increments A.',
      args: [CInteger],
      results: [CInteger],
      execute(stack: Stack, A: CInteger): void {
        stack.pushInteger(A.value + 1)
      },
    },
  ],
}
export { h }
