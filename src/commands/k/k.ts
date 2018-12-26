import { Command } from 'charly/command'
import { Stack } from 'charly/stack'
import { CItem, CList, CString } from 'charly/types'

function swapCaseChar(char: string): string {
  return char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
}

function swapCaseStr(s: string): string {
  return s
    .split('')
    .map(swapCaseChar)
    .join('')
}

const k: Command = {
  key: 'k',
  arity: 1,
  modes: [
    {
      name: 'swapCase',
      description:
        'Convert every element in A to to a string and swap its case. Nested lists will be flattened during that.',
      args: [CList],
      results: [CList],
      execute(stack: Stack, A: CList): void {
        const result = A.mapToStringList(swapCaseStr)
        stack.push(result)
      },
    },
  ],
}
export { k }
