export class CommandNotExistingError {
  constructor(position, command) {
    this.message = `The command ${command} at position ${position} does not exist!`
  }
  toString() {
    return this.message
  }
}

export class MissingCharacterError {
  constructor(position) {
    this.message = `Expected a character at position ${position}!`
  }
  toString() {
    return this.message
  }
}

export class InvalidStackContentsError {
  constructor(message) {
    this.message = message
  }
  toString() {
    return this.message
  }
}

export class MissingVariableNameError {
  constructor(position) {
    this.message = `Missing the variable name at position ${position + 1}!`
  }
  toString() {
    return this.message
  }
}

export class InvalidEvalStringError {
  constructor(evalString) {
    this.message = `"The string ${evalString} can't be evaluated because of a syntax error!`
  }
  toString() {
    return this.message
  }
}

export class MissingDoubleStringQuoteError {
  constructor(position) {
    this.message = `The double string starting at position ${position} is missing the second quote!`
  }
  toString() {
    return this.message
  }
}

export class CommandNotFinishedError {
  constructor(position) {
    this.message = `The command started at position ${position} is not closed!`
  }
  toString() {
    return this.message
  }
}
