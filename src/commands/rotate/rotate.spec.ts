import { ensure } from 'charly/testHelper'
import { CCommand, CInteger, CString } from 'charly/types'
import { describe, it } from 'mocha'

// tslint:disable:no-unused-expression

describe('@ - rotate', () => {
  it('[itm,itm,itm] => []', () => {
    ensure`1 'a 3@`.returns`a31`.withStack(CString, CInteger, CInteger)
    ensure`1 'a 3@@`.returns`31a`.withStack(CInteger, CInteger, CString)
    ensure`1 'a 3@@@`.returns`1a3`.withStack(CInteger, CString, CInteger)
    ensure`"abc" 1 2 'd {def}@@`.returns`abc1def2d`.withStack(
      CString,
      CInteger,
      CCommand,
      CInteger,
      CString,
    )
  })
})
