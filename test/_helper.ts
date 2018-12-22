import { expect } from 'chai'
import { Charly } from '../src'
import { CharlyError } from '../src/errors'

interface WithInputRetObj {
  returns(expectedOutput: TemplateStringsArray): void
  throws(expectedError: new (a: any) => CharlyError): void
}

interface EnsureRetObj extends WithInputRetObj {
  withInput(input: TemplateStringsArray): WithInputRetObj
}
export function ensure(codeLiterals: TemplateStringsArray): EnsureRetObj {
  const code = codeLiterals[0]
  return {
    // tslint:disable-next-line:object-literal-sort-keys
    returns(expectedOutput: TemplateStringsArray): void {
      expect(Charly.runCode(code)).to.equal(expectedOutput[0])
    },
    throws(expectedError: new () => CharlyError): void {
      expect(() => Charly.runCode(code)).to.throw(expectedError)
    },
    withInput(inputLiterals: TemplateStringsArray): WithInputRetObj {
      const input = inputLiterals[0]
      return {
        returns(expectedOutput: TemplateStringsArray): void {
          expect(Charly.runCode(code, [input])).to.equal(expectedOutput[0])
        },
        throws(expectedError: new () => CharlyError): void {
          expect(() => Charly.runCode(code)).to.throw(expectedError)
        },
      }
    },
  }
}
