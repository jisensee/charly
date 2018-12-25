import { Command } from 'charly/command'
import { Stack } from 'charly/stack'
import { CItem } from 'charly/types'

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
export { duplicate }
