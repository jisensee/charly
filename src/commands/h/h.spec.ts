import { ensure } from 'charly/testHelper'
import { CInteger, CItem } from 'charly/types'
import { describe, it } from 'mocha'

// tslint:disable:no-unused-expression

describe('h - firstElement/increment', () => {
  it('[lst] => [itm]', () => {
    ensure`h`.withInput`abc`.returns`a`.withStack(CItem)
    ensure`h`.withInput`a`.returns`a`.withStack(CItem)
    ensure`[1 2 3]h`.returns`1`.withStack(CItem)
    ensure`""h`.returns``.withStack()
    ensure`[]h`.returns``.withStack()
  })

  it('[int] => [int]', () => {
    ensure`1h`.returns`2`.withStack(CInteger)
    ensure`0h`.returns`1`.withStack(CInteger)
  })
})
