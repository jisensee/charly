import { Command } from 'charly/command'
import { Stack } from 'charly/stack'
import { CList } from 'charly/types'

const u: Command = {
  key: 'u',
  arity: 1,
  modes: [
    {
      name: 'uppercase',
      description:
        'Convert every element in A to to a string and uppercase it. Nested lists will be flattened during that.',
      args: [CList],
      results: [CList],
      execute(stack: Stack, A: CList): void {
        const result = A.mapToStringList(s => s.toUpperCase())
        stack.push(result)
      },
    },
  ],
}
export { u }
