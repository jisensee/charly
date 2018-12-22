/**
 * Fine the index of the closing bracket which has been opened at the
 * specified start index while accounting for nested brackets.
 * @param code The code to process
 * @param startingIndex The index of the first opening bracket in the code
 * @param openingBracket Defines the opening brace
 * @param closingBracket Defines the closing brace
 * @returns The index of the closing bracket or null if the bracket is never
 * closed.
 */
export function findClosingBracketIndex(
  code: string,
  startingIndex: number,
  openingBracket: string,
  closingBracket: string,
): number | null {
  let index = startingIndex + 1

  let openingBracketCount = 0
  let endFound = false

  while (!endFound) {
    const c = code[index]
    // Return -1 if we reach the end without a closing bracket
    if (index === code.length) {
      return null
    } else if (c === openingBracket) {
      /*
      If we find an opening bracket, we increase the counter,
      so we need one more closing one
      */
      ++openingBracketCount
    } else if (c === closingBracket && openingBracketCount > 0) {
      // If we find a closing bracket that closes another nested bracket
      --openingBracketCount
    } else if (c === closingBracket && openingBracketCount === 0) {
      // If we find the closing bracket that ends the bracket
      endFound = true
    }
    ++index
  }

  // Correct index since it points on position after closing bracket
  return index - 1
}
