import { ensure } from 'charly/testHelper'
import { CInteger, CList } from 'charly/types'
import { describe, it } from 'mocha'

// tslint:disable:no-unused-expression

describe('y - allButFirst/allButFirstOfInt', () => {
  it('[lst] => [lst]', () => {
    ensure`y`.withInput`abc`.returns`bc`.withStack(CList)
    ensure`y`.withInput`a`.returns``.withStack()
    ensure`Ey`.returns``.withStack()
    ensure`[1 2 3]y`.returns`23`.withStack(CList)
    ensure`[[2 3]1 4]y`.returns`14`.withStack(CList)
    ensure`[1]y`.returns``.withStack()
    ensure`[]y`.returns``.withStack()
  })

  it('[int] => [int]', () => {
    ensure`123y`.returns`23`.withStack(CInteger)
    ensure`1y`.returns``.withStack()
  })
})
