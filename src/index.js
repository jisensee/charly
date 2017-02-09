import runCode from "./runCode"
import Stack from "./stack"
import {String} from "./types"
import fs from "fs"

export default class Ipos {
  static runCode(code, input) {
    const stack = new Stack(input ? [new String(input)] : [])
    return runCode(code, stack).toString()
  }

  static runCodeFromFile(filename, input) {
    const code = fs.readFileSync(filename)
    return this.runCode(code, input)
  }
}
