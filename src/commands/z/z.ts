import { Command } from 'charly/command'
import { Stack } from 'charly/stack'
import { CInteger, CList } from 'charly/types'

const z: Command = {
  key: 'z',
  arity: 1,
  modes: [
    {
      name: 'allButLast',
      description:
        'Pushes all but the last element of A. Pushes nothing if A has less than two elements.',
      args: [CList],
      results: [CList],
      execute(stack: Stack, A: CList): void {
        if (A.value.length > 1) {
          stack.pushList(A.value.slice(0, A.value.length - 1))
        }
      },
    },
    {
      name: 'allButLastOfInt',
      description:
        'Takes all but the last digit of A and pushes the rest as new integer.',
      args: [CInteger],
      results: [CInteger],
      execute(stack: Stack, A: CInteger): void {
        const str = A.value.toString()
        if (str.length > 1) {
          const result = parseInt(str.slice(0, str.length - 1), 10)
          stack.pushInteger(result)
        }
      },
    },
  ],
}
export { z }
