import { ensure } from 'charly/testHelper'
import { CInteger } from 'charly/types'
import { describe, it } from 'mocha'

// tslint:disable:no-unused-expression

describe('t - listLength/intLength', () => {
  it('[lst] => [int]', () => {
    ensure`t`.withInput`abcd`.returns`4`.withStack(CInteger)
    ensure`Et`.returns`0`.withStack(CInteger)
    ensure`t`.withInput`a`.returns`1`.withStack(CInteger)
    ensure`[1 2]t`.returns`2`.withStack(CInteger)
    ensure`[]t`.returns`0`.withStack(CInteger)
    ensure`[1[2 3]]t`.returns`2`.withStack(CInteger)
  })

  it('[int] => [int]', () => {
    ensure`2t`.returns`1`.withStack(CInteger)
    ensure`123t`.returns`3`.withStack(CInteger)
    ensure`0013t`.returns`2`.withStack(CInteger)
  })
})
