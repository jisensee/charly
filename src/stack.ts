import { Mode } from './commands/command'
import { InvalidStackContentsError } from './errors'
import { CCommand, CInteger, CItem, CList, CRegex, CString } from './types'

export class Stack {
  /**
   * Holds the content of the stack as array
   */
  public readonly content: CItem[]

  /**
   * Creates a new stack
   */
  public constructor(initialContent: CItem[] = []) {
    this.content = initialContent
  }

  /**
   * Clears the stack
   */
  public clear(): void {
    this.content.length = 0
  }

  /**
   * Removes the top item of the stack and returns it
   */
  public pop(): CItem {
    const item = this.content.pop()
    if (!item) {
      const message = "Can't pop items from an empty stack!"
      throw new InvalidStackContentsError(message)
    }
    return item
  }

  /**
   * Pop mulitple items from the stack at once.
   * @param count The amount of items to be popped. If not given, all items
   * will be popped.
   * @returns The top n items from the stack with the top item at the start of
   * the list
   */
  public popItems(count?: number): CItem[] {
    const countToPop = count ? count : this.size

    const resultList: CItem[] = []
    for (let i = 0; i < countToPop; i++) {
      resultList.unshift(this.pop())
    }
    return resultList
  }

  /**
   * Returns the number of stack items
   */
  public get size(): number {
    return this.content.length
  }

  /**
   * Converts every item to a string and joins them bottom to top.
   */
  public toString(): string {
    return this.content.map(e => e.toString()).join('')
  }

  /**
   * Retrieve a list of the values of the stack items
   */
  public get unpackedContent(): any[] {
    return this.content.map(e => e.value)
  }

  /**
   * Adds a new item at the top of the stack. The item has to be wrapped into
   * the appropiate type already.
   * @param item The new stack item
   */
  public push(item: CItem): void {
    this.content.push(item)
  }

  /**
   * Returns the given amount of items from the top of the stack. The top item
   * is the last in the list. The elements are NOT removed from the stack.
   * @param count The amount of items to return from the top of the stack
   * @returns The top n elements with the top elements at the end
   */
  public getTopItems(count: number): CItem[] {
    if (this.size < count) {
      const message = `Can't retrieve top ${count} items from the stack, since
 it has only ${this.size} items!`
      throw new InvalidStackContentsError(message)
    }
    return this.content.slice(-count)
  }

  /**
   * Returns the item at the given position. The item is NOT removed from the
   * stack.
   */
  public getItem(index: number): CItem {
    return this.content[index]
  }

  public pushInteger(integer: number): void {
    this.push(new CInteger(integer))
  }

  public pushString(str: string): void {
    this.push(new CString(str))
  }

  public pushCommand(command: string): void {
    this.push(new CCommand(command))
  }

  public pushRegex(regex: string): void {
    this.push(new CRegex(regex))
  }

  public pushList(list: CItem[]): void {
    this.push(new CList(list))
  }
}
