import { InvalidStackContentsError } from 'charly/errors'
import { ensure } from 'charly/testHelper'
import { CCommand, CInteger, CString } from 'charly/types'
import { describe, it } from 'mocha'

// tslint:disable:no-unused-expression

describe('$ - copy', () => {
  it('[int] => [itm]', () => {
    ensure`1'a{bcd}1$`.returns`1abcda`.withStack(
      CInteger,
      CString,
      CCommand,
      CString,
    )
    ensure`1 2 3 3$`.returns`1231`.withStack(
      CInteger,
      CInteger,
      CInteger,
      CInteger,
    )
    ensure`1$`.throws(InvalidStackContentsError)
  })
})
