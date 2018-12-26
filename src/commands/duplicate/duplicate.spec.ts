import { ensure } from 'charly/testHelper'
import { CInteger, CString } from 'charly/types'
import { describe, it } from 'mocha'

// tslint:disable:no-unused-expression

describe('_ - duplicate', () => {
  it('[itm] => [itm,itm]', () => {
    ensure`1 'a_`.returns`1aa`.withStack(CInteger, CString, CString)
    ensure`1 'a___`.returns`1aaaa`.withStack(
      CInteger,
      CString,
      CString,
      CString,
      CString,
    )
    ensure`1_`.returns`11`.withStack(CInteger, CInteger)
  })
})
