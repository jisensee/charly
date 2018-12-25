import { Command } from 'charly/command'
import { Stack } from 'charly/stack'
import { CInteger, CList } from 'charly/types'

const r: Command = {
  key: 'r',
  arity: 1,
  modes: [
    {
      name: 'reverse',
      description: 'Reverse A.',
      args: [CList],
      results: [CList],
      execute(stack: Stack, A: CList): void {
        stack.pushList(A.value.reverse())
      },
    },
    {
      name: 'reverseInt',
      description: 'Reverse the digits on A. Leading zero are removed.',
      args: [CInteger],
      results: [CInteger],
      execute(stack: Stack, A: CInteger): void {
        const reversedInt = A.value
          .toString()
          .split('')
          .reverse()
          .join('')
        stack.pushInteger(parseInt(reversedInt, 10))
      },
    },
  ],
}
export { r }
