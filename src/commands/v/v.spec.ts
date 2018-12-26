import { ensure } from 'charly/testHelper'
import { CInteger, CItem } from 'charly/types'
import { describe, it } from 'mocha'

// tslint:disable:no-unused-expression

describe('v - lastElement/decrement', () => {
  it('[lst] => [itm]', () => {
    ensure`v`.withInput`abc`.returns`c`.withStack(CItem)
    ensure`v`.withInput`a`.returns`a`.withStack(CItem)
    ensure`[1 2 3]v`.returns`3`.withStack(CItem)
    ensure`Ev`.returns``.withStack()
    ensure`[]v`.returns``.withStack()
  })

  it('[int] => [int]', () => {
    ensure`2v`.returns`1`.withStack(CInteger)
    ensure`1v`.returns`0`.withStack(CInteger)
  })
})
