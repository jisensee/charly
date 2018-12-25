import { Command } from 'charly/command'
import { Stack } from 'charly/stack'
import { CItem } from 'charly/types'

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
export { rotate }
