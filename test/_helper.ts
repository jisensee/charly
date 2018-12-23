import { expect } from 'chai'
import { Charly } from '../src'
import { CharlyError } from '../src/errors'
import { runCode } from '../src/parser/runCode'
import { Stack } from '../src/stack'
import { CItem, CString } from '../src/types'

interface WithInputRetObj {
  returns(expectedOutput: TemplateStringsArray): void
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
  const actualTypes = actualStack.content.map(i => i.typeName)
  const expecedTypes = expectedStackTypes.map(t => new t(null).typeName)
  expect(actualTypes).to.eql(expecedTypes)
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
