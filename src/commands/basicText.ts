import { Stack } from '../stack'
import { CInteger, CItem, CList, CString } from '../types'
import { Command } from './command'

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

const h: Command = {
  key: 'h',
  arity: 1,
  modes: [
    {
      name: 'firstElement',
      description:
        'Pushes the first element of A. Pushes nothing if A is empty.',
      args: [CList],
      results: [CItem],
      execute(stack: Stack, A: CList): void {
        if (A.value.length > 0) {
          stack.push(A.value[0])
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
  modes: [
    {
      name: 'lastElement',
      description:
        'Pushes the last element from A. Pushes nothing if A is empty.',
      args: [CList],
      results: [CItem],
      execute(stack: Stack, A: CList): void {
        if (A.value.length > 0) {
          stack.push(A.value[A.value.length - 1])
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

const t: Command = {
  key: 't',
  arity: 1,
  modes: [
    {
      name: 'listLength',
      description: 'Get the length of A.',
      args: [CList],
      results: [CInteger],
      execute(stack: Stack, A: CList): void {
        stack.pushInteger(A.value.length)
      },
    },
    {
      name: 'intLength',
      description: 'Get the digit count of A.',
      args: [CInteger],
      results: [CInteger],
      execute(stack: Stack, A: CInteger): void {
        stack.pushInteger(A.toString().length)
      },
    },
  ],
}

const y: Command = {
  key: 'y',
  arity: 1,
  modes: [
    {
      name: 'allButFirst',
      description:
        'Pushes all but the first element of A. Pushes nothing if A has less than two elements.',
      args: [CList],
      results: [CList],
      execute(stack: Stack, A: CList): void {
        if (A.value.length > 1) {
          stack.pushList(A.value.slice(1))
        }
      },
    },
    {
      name: 'allButFirstOfInt',
      description:
        'Takes all but the first digit of A and pushes the rest as new integer.',
      args: [CInteger],
      results: [CInteger],
      execute(stack: Stack, A: CInteger): void {
        const str = A.value.toString()
        if (str.length > 1) {
          const result = parseInt(str.slice(1), 10)
          stack.pushInteger(result)
        }
      },
    },
  ],
}

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

export const basicTextCommands = [l, u, plus, r, h, v, t, y, z]
