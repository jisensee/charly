import { ensure } from 'charly/testHelper'
import { CList } from 'charly/types'
import { describe, it } from 'mocha'

// tslint:disable:no-unused-expression

describe('k - swapCase', () => {
  it('[lst] => [lst]', () => {
    ensure`k`.withInput`aBcD`.returns`AbCd`.withStack(CList)
    ensure`k`.withInput`abcd`.returns`ABCD`.withStack(CList)
    ensure`k`.withInput`ABCD`.returns`abcd`.withStack(CList)
    ensure`[1 "abF"]k`.returns`1ABf`.withStack(CList)
    ensure`Ek`.returns``.withStack(CList)
  })
})
