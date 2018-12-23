import { describe, it } from 'mocha'
import { ensure } from './_helper'

// tslint:disable:no-unused-expression

describe('basicText', () => {
  describe('l - lowercase', () => {
    it('A<lst>', () => {
      ensure`l`.withInput`ABC`.returns`abc`
      ensure`l`.withInput`ABc`.returns`abc`
      ensure`l`.withInput`abc`.returns`abc`
      ensure`["AbC"["DEF""gHi"]]l`.returns`abcdefghi`
      ensure`[1 "Ab"]l`.returns`1ab`
    })
  })

  describe('u - uppercase', () => {
    it('A<lst>', () => {
      ensure`u`.withInput`abc`.returns`ABC`
      ensure`u`.withInput`ABc`.returns`ABC`
      ensure`u`.withInput`ABC`.returns`ABC`
      ensure`[1 "abF"]u`.returns`1ABF`
    })
  })

  describe('r - reverse', () => {
    it('A<lst>', () => {
      ensure`r`.withInput`abc`.returns`cba`
      ensure`r`.withInput`bb`.returns`bb`
      ensure`r`.withInput`a`.returns`a`
      ensure`[1 2 3]r`.returns`321`
      ensure`[[1 2][3 4]"ab"]r`.returns`ab3412`
      ensure`Er`.returns``
    })

    it('A<int>', () => {
      ensure`12r`.returns`21`
      ensure`1r`.returns`1`
      ensure`10r`.returns`1`
    })
  })

  describe('+ - concat', () => {
    it('B<itm> A<itm>', () => {
      ensure`'a"bc"+`.returns`abc`
      ensure`1'a+`.returns`1a`
      ensure`{def}\`ghi\`+`.returns`defghi`
      ensure`11 22'c++`.returns`1122c`
    })

    it('B<itm> A<lst>', () => {
      ensure`3[1 2]+`.returns`312`
      ensure`E[1 2]+`.returns`12`
    })

    it('B<lst> A<itm>', () => {
      ensure`[1 2]3+`.returns`123`
      ensure`[1 2]E+`.returns`12`
    })

    it('B<lst> A<lst>', () => {
      ensure`[1 2 3][3 2 1]+`.returns`123321`
    })
  })

  describe('h - firstElement/increment', () => {
    it('A<lst>', () => {
      ensure`h`.withInput`abc`.returns`a`
      ensure`h`.withInput`a`.returns`a`
      ensure`""h`.returns``
      ensure`[1 2 3]h`.returns`1`
      ensure`[]h`.returns``
    })

    it('A<int>', () => {
      ensure`1h`.returns`2`
      ensure`0h`.returns`1`
    })
  })

  describe('v - lastElement/decrement', () => {
    it('A<lst>', () => {
      ensure`v`.withInput`abc`.returns`c`
      ensure`v`.withInput`a`.returns`a`
      ensure`Ev`.returns``
      ensure`[1 2 3]v`.returns`3`
      ensure`[]v`.returns``
    })

    it('A<int>', () => {
      ensure`2v`.returns`1`
      ensure`1v`.returns`0`
    })
  })

  describe('t - length', () => {
    it('A<lst>', () => {
      ensure`t`.withInput`abcd`.returns`4`
      ensure`Et`.returns`0`
      ensure`t`.withInput`a`.returns`1`
      ensure`[1 2]t`.returns`2`
      ensure`[]t`.returns`0`
      ensure`[1[2 3]]t`.returns`2`
    })

    it('A<int>', () => {
      ensure`2t`.returns`1`
      ensure`123t`.returns`3`
      ensure`0013t`.returns`2`
    })
  })

  describe('y - allButFirst', () => {
    it('A<lst>', () => {
      ensure`y`.withInput`abc`.returns`bc`
      ensure`y`.withInput`a`.returns``
      ensure`Ey`.returns``
      ensure`[1 2 3]y`.returns`23`
      ensure`[[2 3]1 4]y`.returns`14`
      ensure`[1]y`.returns``
      ensure`[]y`.returns``
    })

    it('A<int>', () => {
      ensure`123y`.returns`23`
      ensure`1y`.returns``
    })
  })

  describe('z - allButLast', () => {
    it('A<lst>', () => {
      ensure`z`.withInput`abc`.returns`ab`
      ensure`z`.withInput`a`.returns``
      ensure`Ez`.returns``
      ensure`[1 2 3]z`.returns`12`
      ensure`[1[2 3]]z`.returns`1`
      ensure`[1]z`.returns``
      ensure`[]z`.returns``
    })

    it('A<int>', () => {
      ensure`123z`.returns`12`
      ensure`1z`.returns``
    })
  })
})
