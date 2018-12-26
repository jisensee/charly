import { Command } from 'charly/command'
import { InvalidStackContentsError } from 'charly/errors'
import { Stack } from 'charly/stack'
import { CInteger, CItem } from 'charly/types'

const copy: Command = {
  key: '$',
  arity: 1,
  modes: [
    {
      name: 'copy',
      description:
        'Copies the item with the index A to the top of the stack. Index 0 is the item on the bottom of the stack.',
      args: [CInteger],
      results: [CItem],
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
export { copy }
