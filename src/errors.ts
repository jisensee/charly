export abstract class CharlyError {
  private readonly message: string
  private x: number = 2
  public constructor(message: string) {
    this.message = message
  }

  public toString(): string {
    return this.message
  }
}

export class CommandNotExistingError extends CharlyError {
  public constructor(position: number, command: string) {
    super(`The command ${command} at position ${position} does not exist!`)
  }
}

export class MissingCharacterError extends CharlyError {
  public constructor(position: number) {
    super(`Expected a character at position ${position}!`)
  }
}

export class InvalidStackContentsError extends CharlyError {}

export class MissingVariableNameError extends CharlyError {
  public constructor(position: number) {
    super(`Missing the variable name at position ${position + 1}!`)
  }
}

export class InvalidEvalStringError extends CharlyError {
  public constructor(evalString: string) {
    super(
      `"The string ${evalString} can't be evaluated because of a syntax error!`,
    )
  }
}

export class MissingDoubleStringQuoteError extends CharlyError {
  public constructor(position: number) {
    super(
      `The double string starting at position ${position} is missing the second
quote!`,
    )
  }
}

export class CommandNotFinishedError extends CharlyError {
  public constructor(position: number) {
    super(`The command started at position ${position} is not closed!`)
  }
}

export class ListNotFinishedError extends CharlyError {
  public constructor(position: number) {
    super(`The list started at position ${position} is not closed!`)
  }
}
