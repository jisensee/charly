import { ensure } from 'charly/testHelper'
import { CInteger, CList } from 'charly/types'
import { describe, it } from 'mocha'

// tslint:disable:no-unused-expression

describe('r - reverse/reverseInt', () => {
  it('[lst] => [lst]', () => {
    ensure`r`.withInput`abc`.returns`cba`.withStack(CList)
    ensure`r`.withInput`bb`.returns`bb`.withStack(CList)
    ensure`r`.withInput`a`.returns`a`.withStack(CList)
    ensure`[1 2 3]r`.returns`321`.withStack(CList)
    ensure`[[1 2][3 4]"ab"]r`.returns`ab3412`.withStack(CList)
    ensure`Er`.returns``.withStack(CList)
  })

  it('[int] => [int]', () => {
    ensure`12r`.returns`21`.withStack(CInteger)
    ensure`1r`.returns`1`.withStack(CInteger)
    ensure`10r`.returns`1`.withStack(CInteger)
  })
})
