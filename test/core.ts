import { describe, it } from 'mocha'
import {
  CommandNotFinishedError,
  InvalidStackContentsError,
  ListNotFinishedError,
  MissingVariableNameError,
} from '../src/errors'
import { ensure } from './_helper'

// tslint:disable:no-unused-expression

describe('core', () => {
  it('pushing simple literals', () => {
    ensure` `.returns``
    ensure`1 2 3`.returns`123`
    ensure`12 3`.returns`123`
    ensure`1'a2`.returns`1a2`
    ensure`"abc""def"`.returns`abcdef`
    ensure`'a!r1"abc"3`.returns`ar1abc3`
    ensure`´abc´def´2 "ghi"`.returns`abcdef2ghi`
    ensure`1"abc""abc" 'a2{def}"ghi"\`def\``.returns`1abcabca2defghidef`
  })

  it('pushing lists', () => {
    ensure`[1 3 "abc"]`.returns`13abc`
    ensure`[1[2 3['a"abc"]3]8]`.returns`123aabc38`
    ensure`[1`.throws(ListNotFinishedError)
    ensure`[[[1]2]`.throws(ListNotFinishedError)
  })

  it('pushing commands', () => {
    ensure`{1 3 "abc"}`.returns`1 3 "abc"`
    ensure`{1{2 3{'a"abc"}3}8}`.returns`1{2 3{'a"abc"}3}8`
    ensure`!a`.returns`a`
    ensure`{1`.throws(CommandNotFinishedError)
    ensure`{{{1}2}`.throws(CommandNotFinishedError)
  })

  it('variable assignment', () => {
    ensure`"abc"=A`.returns`abc`
    ensure`"abc"=AA`.returns`abcabc`
    ensure`=A`.throws(InvalidStackContentsError)
    ensure`=`.withInput`abc'`.throws(MissingVariableNameError)
  })
})
