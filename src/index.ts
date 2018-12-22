import { readFileSync } from 'fs'
import { runCode } from './parser/runCode'
import { Stack } from './stack'
import { CString } from './types'

export class Charly {
  public static runCode(code: string, input: string[] = []): string {
    const stack = new Stack(input.map(i => new CString(i)))
    return runCode(code, stack).toString()
  }

  // static runCodeFromFile(filename: string, input: string[] = []) {
  //   const code = readFileSync(filename)
  //   return this.runCode(code, input)
  // }
}
