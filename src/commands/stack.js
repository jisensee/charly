import { Item, Integer } from "../types"
import { InvalidStackContentsError } from "../errors"

export default [

class swap {
  static key = `/`
  static modeList = [{
    name: `swap`,
    args: [Item, Item],
    results: [],
    description: `Swaps the top two stack items.`,
  }]

  static run(stack) {
    const [M, B, A] = stack.popArguments(this.modeList, 2, false)

    switch(M) {
      case `swap`:
        stack.push(A)
        stack.push(B)
    }
  }
},

class duplicate {
  static key = `_`
  static modeList = [{
    name: `duplicate`,
    args: [Item],
    results: [],
    description: `Duplicates the top stack item.`,
  }]

  static run(stack) {
    const [M, A] = stack.popArguments(this.modeList, 1, false)

    switch(M) {
      case `duplicate`:
        stack.push(A)
        stack.push(A)
    }
  }
},

class discard {
  static key = `;`
  static modeList = [{
    name: `discard`,
    args: [Item],
    results: [],
    description: `Discards the top stack item.`,
  }]

  static run(stack) {
    const [M, A] = stack.popArguments(this.modeList, 1, false)

    switch(M) {
      case `discard`:
        // Nothing to do here, we already popped the top item
    }
  }
},

class rotate {
  static key = `@`
  static modeList = [{
    name: `rotate`,
    args: [Item, Item, Item],
    results: [],
    description: `Pushes the 3rd item to the top and shifts the other two down.`,
  }]

  static run(stack) {
    const [M, C, B, A] = stack.popArguments(this.modeList, 3, false)

    switch(M) {
      case `rotate`:
        stack.push(B)
        stack.push(A)
        stack.push(C)
    }
  }
},

class copy {
  static key = `$`
  static modeList = [{
    name: `copy`,
    args: [Integer],
    results: [],
    description: `Copies the item with the index A to the top of the stack. The item on the bottom has the index 0. Uses modular indexing.`,
  }]

  static run(stack) {
    const [M, A] = stack.popArguments(this.modeList, 1, false)

    switch(M) {
      case `copy`:
        if(stack.size === 0) {
          throw new InvalidStackContentsError(`Can't copy if the stack if empty!`)
        } else {
          const result = stack.getItem(A % stack.size)
          stack.push(result)
        }
    }
  }
},

]
