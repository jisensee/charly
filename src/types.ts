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

export class CString extends CItem {
  public value: string
  public constructor(value: string) {
    super(value, 'str')
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
  public constructor(value: CItem[]) {
    super(value, 'lst')
  }

  public unpack(): CPrimitive[] {
    const lst = this.value as CItem[]
    return lst.map(e => e.value)
  }

  public toString(): string {
    if (this.value instanceof Array) {
      return `[${this.value.map(e => e.toString()).join(', ')}]`
    } else {
      return ''
    }
  }
}
