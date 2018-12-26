import { ensure } from 'charly/testHelper'
import { CInteger, CList } from 'charly/types'
import { describe, it } from 'mocha'

// tslint:disable:no-unused-expression

describe('z - allButLast/allButLastOfInt', () => {
  it('[lst] => [lst]', () => {
    ensure`z`.withInput`abc`.returns`ab`.withStack(CList)
    ensure`z`.withInput`a`.returns``.withStack()
    ensure`Ez`.returns``.withStack()
    ensure`[1 2 3]z`.returns`12`.withStack(CList)
    ensure`[1[2 3]]z`.returns`1`.withStack(CList)
    ensure`[1]z`.returns``.withStack()
    ensure`[]z`.returns``.withStack()
  })

  it('[int] => [int]', () => {
    ensure`123z`.returns`12`.withStack(CInteger)
    ensure`1z`.returns``.withStack()
  })
})
