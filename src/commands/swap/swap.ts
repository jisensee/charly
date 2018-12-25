import { Command } from 'charly/command'
import { Stack } from 'charly/stack'
import { CItem } from 'charly/types'

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
export { swap }
