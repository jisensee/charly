import { CInteger, CItem, CString } from './types'

interface Variable {
  name: string
  value: CItem
  remark?: string
}

export function getVariable(name: string): Variable | null {
  const foundVariables = variables.filter(v => v.name === name)
  if (!foundVariables.length) {
    return null
  }
  return foundVariables[0]
}

export function assignVariable(name: string, value: CItem): void {
  const variable = getVariable(name)
  if (variable) {
    variable.value = value
  } else {
    variables.push({ name, value })
  }
}

const variables: Variable[] = [
  {
    name: 'B',
    value: new CString('\n'),
  },
  {
    name: 'D',
    value: new CString('.'),
  },
  {
    name: 'E',
    value: new CString(''),
    remark: 'Empty string',
  },
  {
    name: 'L',
    value: new CString('abcdefghijklmnopqrstuvwxyz'),
  },
  {
    name: 'N',
    value: new CString('0123456789'),
  },
  {
    name: 'S',
    value: new CString(' '),
    remark: 'Space',
  },
  {
    name: 'T',
    value: new CInteger(10),
  },
  {
    name: 'U',
    value: new CString('_'),
  },
]

export { variables }
