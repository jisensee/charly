import { describe, it } from 'mocha'
import { CInteger, CItem, CList, CString } from '../src/types'
import { ensure } from './_helper'

// tslint:disable:no-unused-expression

describe('basicText', () => {
  describe('l - lowercase', () => {
    it('[lst] => [lst]', () => {
      ensure`l`.withInput`ABC`.returns`abc`.withStack(CList)
      ensure`l`.withInput`ABc`.returns`abc`.withStack(CList)
      ensure`l`.withInput`abc`.returns`abc`.withStack(CList)
      ensure`["AbC"["DEF""gHi"]]l`.returns`abcdefghi`.withStack(CList)
      ensure`[1 "Ab"]l`.returns`1ab`.withStack(CList)
      ensure`El`.returns``.withStack(CList)
    })
  })

  describe('u - uppercase', () => {
    it('[lst] => [lst]', () => {
      ensure`u`.withInput`abc`.returns`ABC`.withStack(CList)
      ensure`u`.withInput`ABc`.returns`ABC`.withStack(CList)
      ensure`u`.withInput`ABC`.returns`ABC`.withStack(CList)
      ensure`[1 "abF"]u`.returns`1ABF`.withStack(CList)
      ensure`Eu`.returns``.withStack(CList)
    })
  })

  describe('r - reverse', () => {
    it('A[lst] => [lst]', () => {
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

  describe('+ - concat', () => {
    it('[itm, itm] => [str]', () => {
      ensure`{def}\`ghi\`+`.returns`defghi`.withStack(CString)
      ensure`11 22+`.returns`1122`.withStack(CString)
    })

    it('[itm, lst] => [lst]', () => {
      ensure`3"abc"+`.returns`3abc`.withStack(CList)
      ensure`3[1 2]+`.returns`312`
      ensure`E[1 2]+`.returns`12`
    })

    it('[lst, itm] => [lst]', () => {
      ensure`"abc"3+`.returns`abc3`.withStack(CList)
      ensure`[1 2]3+`.returns`123`.withStack(CList)
      ensure`[1 2]E+`.returns`12`.withStack(CList)
    })

    it('B<lst> A<lst>', () => {
      ensure`"abc"'d+`.returns`abcd`.withStack(CList)
      ensure`[1 2 3][3 2 1]+`.returns`123321`.withStack(CList)
    })
  })

  describe('h - firstElement/increment', () => {
    it('[lst] => [itm]', () => {
      ensure`h`.withInput`abc`.returns`a`.withStack(CItem)
      ensure`h`.withInput`a`.returns`a`.withStack(CItem)
      ensure`[1 2 3]h`.returns`1`.withStack(CItem)
      ensure`""h`.returns``.withStack()
      ensure`[]h`.returns``.withStack()
    })

    it('[int] => [int]', () => {
      ensure`1h`.returns`2`.withStack(CInteger)
      ensure`0h`.returns`1`.withStack(CInteger)
    })
  })

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

  describe('t - length', () => {
    it('[lst] => [int]', () => {
      ensure`t`.withInput`abcd`.returns`4`.withStack(CInteger)
      ensure`Et`.returns`0`.withStack(CInteger)
      ensure`t`.withInput`a`.returns`1`.withStack(CInteger)
      ensure`[1 2]t`.returns`2`.withStack(CInteger)
      ensure`[]t`.returns`0`.withStack(CInteger)
      ensure`[1[2 3]]t`.returns`2`.withStack(CInteger)
    })

    it('[int] => [int]', () => {
      ensure`2t`.returns`1`.withStack(CInteger)
      ensure`123t`.returns`3`.withStack(CInteger)
      ensure`0013t`.returns`2`.withStack(CInteger)
    })
  })

  describe('y - allButFirst', () => {
    it('[lst] => [lst]', () => {
      ensure`y`.withInput`abc`.returns`bc`.withStack(CList)
      ensure`y`.withInput`a`.returns``.withStack()
      ensure`Ey`.returns``.withStack()
      ensure`[1 2 3]y`.returns`23`.withStack(CList)
      ensure`[[2 3]1 4]y`.returns`14`.withStack(CList)
      ensure`[1]y`.returns``.withStack()
      ensure`[]y`.returns``.withStack()
    })

    it('[int] => [int]', () => {
      ensure`123y`.returns`23`.withStack(CInteger)
      ensure`1y`.returns``.withStack()
    })
  })

  describe('z - allButLast', () => {
    it('[lst] => [lst]', () => {
      ensure`z`.withInput`abc`.returns`ab`.withStack(CList)
      ensure`z`.withInput`a`.returns``.withStack()
      ensure`Ez`.returns``.withStack()
      ensure`[1 2 3]z`.returns`12`.withStack(CList)
      ensure`[1[2 3]]z`.returns`1`.withStack(CList)
      ensure`[1]z`.returns``.withStack()
      ensure`[]z`.returns``.withStack()
    })

    it('[int] => [int]', () => {
      ensure`123z`.returns`12`.withStack(CInteger)
      ensure`1z`.returns``.withStack()
    })
  })
})
