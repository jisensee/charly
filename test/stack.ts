import { describe, it } from 'mocha'
import { InvalidStackContentsError } from '../src/errors'
import { CCommand, CInteger, CString } from '../src/types'
import { ensure } from './_helper'

// tslint:disable:no-unused-expression

describe('stack', () => {
  describe('/ -  swap', () => {
    it('B<itm> A<itm>', () => {
      ensure`1 'a/`.returns`a1`.withStack(CString, CInteger)
      ensure`1 'a//`.returns`1a`.withStack(CInteger, CString)
      ensure`1 2/`.returns`21`.withStack(CInteger, CInteger)
    })
  })

  describe('_ - duplicate', () => {
    it('A<itm>', () => {
      ensure`1 'a_`.returns`1aa`.withStack(CInteger, CString, CString)
      ensure`1 'a___`.returns`1aaaa`.withStack(
        CInteger,
        CString,
        CString,
        CString,
        CString,
      )
      ensure`1_`.returns`11`.withStack(CInteger, CInteger)
    })
  })

  describe('; - discard', () => {
    it('A<itm>', () => {
      ensure`1 'a;`.returns`1`.withStack(CInteger)
      ensure`1 2 'a;;`.returns`1`.withStack(CInteger)
      ensure`1;`.returns``.withStack()
    })
  })

  describe('@ - rotate', () => {
    it('C<itm> B<itm> A<itm>', () => {
      ensure`1 'a 3@`.returns`a31`.withStack(CString, CInteger, CInteger)
      ensure`1 'a 3@@`.returns`31a`.withStack(CInteger, CInteger, CString)
      ensure`1 'a 3@@@`.returns`1a3`.withStack(CInteger, CString, CInteger)
      ensure`"abc" 1 2 'd {def}@@`.returns`abc1def2d`.withStack(
        CString,
        CInteger,
        CCommand,
        CInteger,
        CString,
      )
    })
  })

  describe('$ - copy', () => {
    it('C<itm> B<itm> A<itm>', () => {
      ensure`1'a{bcd}1$`.returns`1abcda`.withStack(
        CInteger,
        CString,
        CCommand,
        CString,
      )
      ensure`1 2 3 3$`.returns`1231`.withStack(
        CInteger,
        CInteger,
        CInteger,
        CInteger,
      )
      ensure`1$`.throws(InvalidStackContentsError)
    })
  })
})
