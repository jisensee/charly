import { ensure } from 'charly/testHelper'
import { CList } from 'charly/types'
import { describe, it } from 'mocha'

// tslint:disable:no-unused-expression

describe('l - lowercase', () => {
  it('[lst] => [lst]', () => {
    ensure`l`.withInput`ABC`.returns`abc`.withStack(CList)
    ensure`l`.withInput`ABc`.returns`abc`.withStack(CList)
    ensure`l`.withInput`abc`.returns`abc`.withStack(CList)
    ensure`["AbC"["DEF""gHi"]]l`.returns`abcdefghi`.withStack(CList)
    ensure`[1 "Ab"]l`.returns`1ab`.withStack(CList)
    ensure`El`.returns``.withStack(CList)
  })
})
