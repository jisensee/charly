import { expect } from 'chai'
import { CharlyError } from 'charly/errors'
import { runCode } from 'charly/parser/runCode'
import { Stack } from 'charly/stack'
import { CItem, CString } from 'charly/types'
import { Charly } from '.'

interface WithInputRetObj {
  returns(expectedOutput: TemplateStringsArray): ReturnsRetObj
  throws(expectedError: new (a: any) => CharlyError): void
}

interface EnsureRetObj extends WithInputRetObj {
  withInput(input: TemplateStringsArray): WithInputRetObj
}

interface ReturnsRetObj {
  withStack: (...expectedTypes: Array<new (a: any) => CItem>) => void
}

function getReturnsFunc(
  code: string,
  input?: string,
): (expectedOutput: TemplateStringsArray) => ReturnsRetObj {
  return (expectedOutput: TemplateStringsArray) => {
    const initialStack = input ? [new CString(input)] : []
    const resultStack = runCode(code, new Stack(initialStack))
    expect(resultStack.toString()).to.equal(expectedOutput[0])
    return {
      withStack(...expectedTypes: Array<new (a: any) => CItem>): void {
        checkIfStackTypesMatch(resultStack, expectedTypes)
      },
    }
  }
}

function checkIfStackTypesMatch(
  actualStack: Stack,
  expectedStackTypes: Array<new (a: any) => CItem>,
): void {
  expect(actualStack.size, 'Stack sizes do not match').to.equal(
    expectedStackTypes.length,
  )

  actualStack.content.forEach((item, index) => {
    const expectedType = expectedStackTypes[index]
    const expectedTypeName = new expectedType('').typeName
    const actualTypeName = item.typeName
    if (!(item instanceof expectedType)) {
      const message = `The types at position ${index} in the stack do not match`
      expect(actualTypeName, message).to.equal(expectedTypeName)
    }
  })
}

export function ensure(codeLiterals: TemplateStringsArray): EnsureRetObj {
  const code = codeLiterals[0]
  return {
    // tslint:disable-next-line:object-literal-sort-keys
    returns: getReturnsFunc(code),
    throws(expectedError: new () => CharlyError): void {
      expect(() => Charly.runCode(code)).to.throw(expectedError)
    },
    withInput(inputLiterals: TemplateStringsArray): WithInputRetObj {
      const input = inputLiterals[0]
      return {
        returns: getReturnsFunc(code, input),
        throws(expectedError: new () => CharlyError): void {
          expect(() => Charly.runCode(code)).to.throw(expectedError)
        },
      }
    },
  }
}
