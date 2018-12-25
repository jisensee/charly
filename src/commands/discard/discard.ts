import { Command } from 'charly/command'
import { Stack } from 'charly/stack'
import { CItem } from 'charly/types'

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
export { discard }
