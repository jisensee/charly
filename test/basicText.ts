import { describe, it } from 'mocha'
import { ensure } from './_helper'

// tslint:disable:no-unused-expression

describe('basicText', () => {
  describe('l - lowercase', () => {
    it('A<str>', () => {
      const x = 4
      ensure`l`.withInput`ABC`.returns`abc`
      ensure`l`.withInput`ABc`.returns`abc`
      ensure`l`.withInput`abc`.returns`abc`
    })
  })

  describe('r - reverse', () => {
    it('A<str>', () => {
      ensure`r`.withInput`abc`.returns`cba`
      ensure`r`.withInput`bb`.returns`bb`
    })
  })

  describe('u - uppercase', () => {
    it('A<str>', () => {
      ensure`u`.withInput`abc`.returns`ABC`
      ensure`u`.withInput`ABc`.returns`ABC`
      ensure`u`.withInput`ABC`.returns`ABC`
    })
  })

  describe('+ - concat', () => {
    it('B<itm> A<itm>', () => {
      ensure`'a"bc"+`.returns`abc`
      ensure`1'a+`.returns`1a`
      ensure`{def}\`ghi\`+`.returns`defghi`
      ensure`11 22'c++`.returns`1122c`
    })
  })

  describe('h - firstChar/increment', () => {
    it('A<str>', () => {
      ensure`h`.withInput`abc`.returns`a`
      ensure`h`.withInput`a`.returns`a`
      ensure`""h`.returns``
    })

    it('A<int>', () => {
      ensure`1h`.returns`2`
      ensure`0h`.returns`1`
    })
  })

  describe('v - lastChar/decrement', () => {
    it('A<str>', () => {
      ensure`v`.withInput`abc`.returns`c`
      ensure`v`.withInput`a`.returns`a`
      ensure`""v`.returns``
    })

    it('A<int>', () => {
      ensure`2v`.returns`1`
      ensure`1v`.returns`0`
    })
  })
})
