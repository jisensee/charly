export type CPrimitive = string | number | any[]

/**
 * Represents an item than lies on the stack.
 */
export class CItem {
  public constructor(
    public readonly value: CPrimitive,
    public readonly typeName: string = 'itm',
  ) {}

  public toString(): string {
    return this.value.toString()
  }
}

export class CInteger extends CItem {
  public value: number
  public constructor(value: number) {
    super(value, 'int')
  }
}

export class CCommand extends CItem {
  public value: string
  public constructor(value: string) {
    super(value, 'cmd')
  }
}

export class CRegex extends CItem {
  public value: string
  public constructor(value: string) {
    super(value, 'rgx')
  }
}

export class CList extends CItem {
  public value: CItem[]
  public constructor(value: CItem[], typeName: string = 'lst') {
    super(value, typeName)
  }

  /**
   * Convert every item of the list to a string and aply the given mapping
   * function.
   * @param mapper The mapping function
   * @returns A CList of CStrings
   */
  public mapToStringList(mapper: (s: string) => string): CList {
    const l = this.value
      .map(i => i.toString())
      .map(i => mapper(i))
      .map(i => new CString(i))

    return new CList(l)
  }

  public toString(): string {
    return this.value.map(e => e.toString()).join('')
  }
}

export class CString extends CList {
  public constructor(value: string) {
    super(value.split('').map(c => new CItem(c)), 'str')
  }
}
