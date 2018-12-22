import { Stack } from '../stack'
import { CItem, CPrimitive } from '../types'

export interface Command {
    key: string
    arity: number,
    modeList: Mode[]
}

interface ModeImplementationFunc {
    (stack: Stack, ...args: CItem[])
}

export interface Mode {
    name: string
    description: string,

    args: Array<new(a: CPrimitive) => CItem>
    results: Array<new(a: CPrimitive) => CItem>,

    execute: ModeImplementationFunc,
}
