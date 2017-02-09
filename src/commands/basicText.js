import { String, Integer, Item } from "../types"

export default [

class l {
  static key = `l`
  static modeList = [{
    name: `lowercase`,
    args: [String],
    results: [String],
    description: `Convert A to lowercase.`,
  }]

  static run(stack) {
    const [M, A] = stack.popArguments(this.modeList, 1)

    if(M === `lowercase`) {
      stack.pushString(A.toLowerCase())
    }
  }
},

class u {
  static key = `u`
  static modeList = [{
    name: `uppercase`,
    args: [String],
    results: [String],
    description: `Convert A to uppercase.`,
  }]

  static run(stack) {
    const [M, A] = stack.popArguments(this.modeList, 1)

    if(M === `uppercase`) {
      stack.pushString(A.toUpperCase())
    }
  }
},

class r {
  static key = `r`
  static modeList = [{
    name: `reverse`,
    args: [String],
    results: [String],
    description: `Reverses A.`,
  }]

  static run(stack) {
    const [M, A] = stack.popArguments(this.modeList, 1)

    switch(M) {
      case `reverse`:
        const result = A.split(``).reverse().join(``)
        stack.pushString(result)
        break
    }
  }
},

class plus {
  static key = `+`
  static modeList = [{
    name: `concat`,
    args: [Item, Item],
    results: [String],
    description: `Converts B and A to strings and concatenates them.`,
  }]

  static run(stack) {
    const [M, B, A] = stack.popArguments(this.modeList, 2)

    switch(M) {
      case `concat`:
        stack.pushString(B.toString() + A.toString())
        break
    }
  }
},

]
