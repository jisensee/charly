import { describe, it } from 'mocha'
import { InvalidStackContentsError } from '../src/errors'
import { ensure } from './_helper'

// tslint:disable:no-unused-expression

describe('stack', () => {
  describe('/ -  swap', () => {
    it('B<itm> A<itm>', () => {
      ensure`1 'a/`.returns`a1`
      ensure`1 'a//`.returns`1a`
      ensure`1 2/`.returns`21`
    })
  })

  describe('_ - duplicate', () => {
    it('A<itm>', () => {
      ensure`1 'a_`.returns`1aa`
      ensure`1 'a___`.returns`1aaaa`
      ensure`1_`.returns`11`
    })
  })

  describe('; - discard', () => {
    it('A<itm>', () => {
      ensure`1 'a;`.returns`1`
      ensure`1 2 'a;;`.returns`1`
      ensure`1;`.returns``
    })
  })

  describe('@ - rotate', () => {
    it('C<itm> B<itm> A<itm>', () => {
      ensure`1 'a 3@`.returns`a31`
      ensure`1 'a 3@@`.returns`31a`
      ensure`1 'a 3@@@`.returns`1a3`
      ensure`"abc" 1 2 'd {def}@@`.returns`abc1def2d`
    })
  })

  describe('$ - copy', () => {
    it('C<itm> B<itm> A<itm>', () => {
      ensure`1'a{bcd}1$`.returns`1abcda`
      ensure`1 2 3 3$`.returns`1231`
      ensure`1$`.throws(InvalidStackContentsError)
    })
  })
})
