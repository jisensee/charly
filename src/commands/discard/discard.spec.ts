import { ensure } from 'charly/testHelper'
import { CInteger } from 'charly/types'
import { describe, it } from 'mocha'

// tslint:disable:no-unused-expression

describe('; - discard', () => {
  it('[itm] => []', () => {
    ensure`1 'a;`.returns`1`.withStack(CInteger)
    ensure`1 2 'a;;`.returns`1`.withStack(CInteger)
    ensure`1;`.returns``.withStack()
  })
})
