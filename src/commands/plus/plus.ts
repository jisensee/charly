import { Command } from 'charly/command'
import { Stack } from 'charly/stack'
import { CItem, CList, CString } from 'charly/types'

const plus: Command = {
  key: '+',
  arity: 2,
  modes: [
    {
      name: 'concatLists',
      description: 'Concatenates B and A.',
      args: [CList, CList],
      results: [CList],
      execute(stack: Stack, B: CList, A: CList): void {
        stack.pushList(B.value.concat(A.value))
      },
    },
    {
      name: 'concatListAndItem',
      description: 'Adds A to the end of B.',
      args: [CList, CItem],
      results: [CList],
      execute(stack: Stack, B: CList, A: CItem): void {
        stack.pushList(B.value.concat([A]))
      },
    },
    {
      name: 'concatItemAndList',
      description: 'Adds B to the start of A.',
      args: [CItem, CList],
      results: [CList],
      execute(stack: Stack, B: CItem, A: CList): void {
        stack.pushList([B].concat(A.value))
      },
    },
    {
      name: 'concatItems',
      description: 'Converts B and A to strings and concatenates them.',
      args: [CItem, CItem],
      results: [CString],
      execute(stack: Stack, B: CItem, A: CItem): void {
        stack.pushString(B.toString() + A.toString())
      },
    },
  ],
}
export { plus }
