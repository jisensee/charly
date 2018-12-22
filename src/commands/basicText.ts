import { Stack } from '../stack'
import { CInteger, CItem, CList, CString } from '../types'
import { Command } from './command'

const l: Command = {
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
}

const u: Command = {
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
}

const plus: Command = {
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
}

const r: Command = {
  key: 'r',
  arity: 1,
  modeList: [
    {
      name: 'reverse',
      description: 'reverse A',
      args: [CItem],
      results: [CString],
      execute(stack: Stack, A: CItem): void {
        const result = A.toString()
          .split('')
          .reverse()
          .join('')
        stack.pushString(result)
      },
    },
  ],
}

const h: Command = {
  key: 'h',
  arity: 1,
  modeList: [
    {
      name: 'firstChar',
      description:
        'Takes the first character for A. Pushes nothing if A is empty.',
      args: [CString],
      results: [CString],
      execute(stack: Stack, A: CString): void {
        if (A.value.length > 0) {
          stack.pushString(A.value[0])
        }
      },
    },
    {
      name: 'increment',
      description: 'Increments A.',
      args: [CInteger],
      results: [CInteger],
      execute(stack: Stack, A: CInteger): void {
        stack.pushInteger(A.value + 1)
      },
    },
  ],
}

const v: Command = {
  key: 'v',
  arity: 1,
  modeList: [
    {
      name: 'lastChar',
      description:
        'Takes the last character from A. Pushes nothing if A is empty.',
      args: [CString],
      results: [CString],
      execute(stack: Stack, A: CString): void {
        if (A.value.length > 0) {
          stack.pushString(A.value[A.value.length - 1])
        }
      },
    },
    {
      name: 'decrement',
      description: 'Decrements A.',
      args: [CInteger],
      results: [CInteger],
      execute(stack: Stack, A: CInteger): void {
        stack.pushInteger(A.value - 1)
      },
    },
  ],
}

export const basicTextCommands = [l, u, plus, r, h, v]
