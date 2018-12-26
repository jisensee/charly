import { ensure } from 'charly/testHelper'
import { CList } from 'charly/types'
import { describe, it } from 'mocha'

// tslint:disable:no-unused-expression

describe('u - uppercase', () => {
  it('[lst] => [lst]', () => {
    ensure`u`.withInput`abc`.returns`ABC`.withStack(CList)
    ensure`u`.withInput`ABc`.returns`ABC`.withStack(CList)
    ensure`u`.withInput`ABC`.returns`ABC`.withStack(CList)
    ensure`[1 "abF"]u`.returns`1ABF`.withStack(CList)
    ensure`Eu`.returns``.withStack(CList)
  })
})
