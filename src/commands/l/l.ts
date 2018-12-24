import { Stack } from '../../stack'
import { CList } from '../../types'
import { Command } from '../command'

const l: Command = {
  key: 'l',
  arity: 1,
  modes: [
    {
      name: 'lowercase',
      description:
        'Convert every element in A to to a string and lowercase it. Nested lists will be flattened during that.',
      args: [CList],
      results: [CList],
      execute(stack: Stack, A: CList): void {
        const result = A.mapToStringList(s => s.toLowerCase())
        stack.push(result)
      },
    },
  ],
}
export { l }
