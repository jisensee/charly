import { Stack } from '../stack'
import { CInteger, CItem, CList, CString } from '../types'
import { Command } from './command'

const basicTextCommands: Command[] = [
  {
    key: 'l',
    arity: 1,
    modeList: [
      {
        name: 'lowercase',
        description: 'Convert A to lowercase.',
        args: [CItem],
        results: [CString],
        execute(stack: Stack, A: CItem): void {
          stack.pushString(A.toString().toLowerCase())
        },
      },
    ],
  },
  {
    key: 'u',
    arity: 1,
    modeList: [
      {
        name: 'uppercase',
        description: 'Convert A to uppercase.',
        args: [CItem],
        results: [CString],
        execute(stack: Stack, A: CItem): void {
          stack.pushString(A.toString().toUpperCase())
        },
      },
    ],
  },
  {
    key: '+',
    arity: 2,
    modeList: [
      {
        name: 'concat',
        description: 'Converts B and A to strings and concatenates them.',
        args: [CItem, CItem],
        results: [CString],
        execute(stack: Stack, B: CItem, A: CItem): void {
          stack.pushString(B.toString() + A.toString())
        },
      },
    ],
  },
  {
    key: 'r',
    arity: 1,
    modeList: [
      {
        name: 'reverse',
        description: 'reverse A',
        args: [CItem],
        results: [CString],
        execute(stack: Stack, A: CItem): void {
          const r = A.toString()
            .split('')
            .reverse()
            .join('')
          stack.pushString(r)
        },
      },
    ],
  },
]

export { basicTextCommands }
