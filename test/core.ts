import { describe, it } from 'mocha'
import {
  InvalidStackContentsError,
  MissingVariableNameError,
} from '../src/errors'
import { ensure } from './_helper'

// tslint:disable:no-unused-expression

describe('core', () => {
  it('pushing literals', () => {
    ensure` `.returns``
    ensure`1 2 3`.returns`123`
    ensure`12 3`.returns`123`
    ensure`1'a2`.returns`1a2`
    ensure`"abc""def"`.returns`abcdef`
    ensure`'a!r1"abc"3`.returns`ar1abc3`
    ensure`´abc´def´2 "ghi"`.returns`abcdef2ghi`
    ensure`1"abc""abc" 'a2{def}"ghi"\`def\``.returns`1abcabca2defghidef`
  })

  it('variable assignment', () => {
    ensure`"abc"=A`.returns`abc`
    ensure`"abc"=AA`.returns`abcabc`
    ensure`=A`.throws(InvalidStackContentsError)
    ensure`=`.withInput`abc'`.throws(MissingVariableNameError)
  })
})
