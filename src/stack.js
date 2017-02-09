import * as types from "./types"
import {InvalidStackContentsError} from "./errors"

export default class {
  /**
   * Creates a new stack
   */
  constructor(initialContent = []) {
    this._content = initialContent
  }

  /**
   * Clears the stack
   */
  clear() {
    this._content.length = 0
  }

  /**
   * Removes the top item of the stack and returns it
   */
  pop() {
    return this.content.pop()
  }

  /**
   * Returns the number of stack items
   */
  get size() {
    return this.content.length
  }

  /**
   * Returns the contents of the stack as array
   */
  get content() {
    return this._content
  }

  /**
   * Converts every item to a string and joins them bottom to top.
   */
  toString() {
    return this.content.map(e => e.toString()).join("")
  }

  get unpackedContent() {
    return this.content.map(e => e.value)
  }

  /**
   * Expects a modeList and an arity and returns the operands and the corrosponding mode in the
   * format [mode, operand1, operand2, ...]
		If unpack is True the values of the items are returned, otherwise the instances of the
    respective types are retuned.
		The modeList has the following format: [{args: [Integer, String, ...], name: modeName}, ...]
		Each list element represents a mode in which the command can work depending on the argument
    types on the stack.
   */
  popArguments(modeList, arity, unpack=true) {
    if(this.size < arity) {
      const message = `Expected ${arity} items on the stack, but the stack only contains ${this.size}!`
      throw new InvalidStackContentsError(message)
    }

    const topStackItems = this.getTopItems(arity)

    // Loop through all the modes and take the first that matches the top stack types
    const mode = modeList.find(mode => {
      if(topStackItems.every((value, index) => value instanceof mode.args[index])) {
        return true
      }
      return false
    })

    if(mode) {
      const args = []
      for(let i = 0; i < arity; ++i) {
        const arg = this.pop()
        args.push(unpack ? arg.value : arg)
      }
      return [mode.name].concat(args.reverse())
    } else {
      const typesList = modeList.map(mode => mode.args)
      const topStackTypes = topStackItems.map(i => i.typeName)
      const message = `Expected one of the types ${typesList} on the stack but got ${topStackTypes}`
      throw new InvalidStackContentsError(message)
    }
  }

  /**
   * Adds add a new item at the top of the stack. The item has to be wrapped into the appropiate
   * type already.
   */
  push(item) {
    this.content.push(item)
  }

  /**
   * Returns the given amount of items from the top of the stack. The top item is the last in the
   * list. The elements are NOT removed from the stack.
   */
  getTopItems(count) {
    return this.content.slice(-count)
  }

  /**
   * Returns the item at the given position. The item is NOT removed from the stack.
   */
  getItem(index) {
    return this.content[index]
  }

  pushInteger(integer) {
    this.push(new types.Integer(integer))
  }

  pushString(string) {
    this.push(new types.String(string))
  }

  pushCommand(command) {
    this.push(new types.Command(command))
  }

  pushRegex(regex) {
    this.push(new types.Regex(regex))
  }

  pushArray(array) {
    this.push(new types.Array(array))
  }
}
