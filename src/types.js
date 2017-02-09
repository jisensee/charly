export class Item {
  static typeName = `itm`

  constructor(value) {
    this.value = value
  }

  toString() {
    return this.value.toString()
  }
}

export class Integer extends Item {
  static typeName = `int`

  constructor(value) {
    super(value)
  }
}

export class String extends Item {
  static typeName = `str`

  constructor(value) {
    super(value)
  }
}

export class Command extends Item {
  static typeName = `cmd`

  constructor(value) {
    super(value)
  }
}

export class Regex extends Item {
  static typeName = `rgx`

  constructor(value) {
    super(value)
  }
}

export class Array extends Item {
  static typeName = `arr`

  constructor(value) {
    super(value)
  }

  toString() {
    return `[${this.value.map(e => e.toString()).join(", ")}]`
  }
}
