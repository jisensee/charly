import { ensure } from 'charly/testHelper'
import { CInteger, CString } from 'charly/types'
import { describe, it } from 'mocha'

// tslint:disable:no-unused-expression

describe('/ - swap', () => {
  it('[itm,itm] => []', () => {
    ensure`1 'a/`.returns`a1`.withStack(CString, CInteger)
    ensure`1 'a//`.returns`1a`.withStack(CInteger, CString)
    ensure`1 2/`.returns`21`.withStack(CInteger, CInteger)
  })
})
