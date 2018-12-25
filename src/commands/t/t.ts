import { Command } from 'charly/command'
import { Stack } from 'charly/stack'
import { CInteger, CList } from 'charly/types'

const t: Command = {
  key: 't',
  arity: 1,
  modes: [
    {
      name: 'listLength',
      description: 'Get the length of A.',
      args: [CList],
      results: [CInteger],
      execute(stack: Stack, A: CList): void {
        stack.pushInteger(A.value.length)
      },
    },
    {
      name: 'intLength',
      description: 'Get the digit count of A.',
      args: [CInteger],
      results: [CInteger],
      execute(stack: Stack, A: CInteger): void {
        stack.pushInteger(A.toString().length)
      },
    },
  ],
}
export { t }
