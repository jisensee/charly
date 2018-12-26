import { ensure } from 'charly/testHelper'
import { CList, CString } from 'charly/types'
import { describe, it } from 'mocha'

// tslint:disable:no-unused-expression

// tslint:disable-next-line: max-line-length
describe('+ - concatLists/concatListAndItem/concatItemAndList/concatItems', () => {
  it('[lst,lst] => [lst]', () => {
    ensure`"abc"'d+`.returns`abcd`.withStack(CList)
    ensure`[1 2 3][3 2 1]+`.returns`123321`.withStack(CList)
  })

  it('[lst,itm] => [lst]', () => {
    ensure`"abc"3+`.returns`abc3`.withStack(CList)
    ensure`[1 2]3+`.returns`123`.withStack(CList)
    ensure`[1 2]E+`.returns`12`.withStack(CList)
  })

  it('[itm,lst] => [lst]', () => {
    ensure`3"abc"+`.returns`3abc`.withStack(CList)
    ensure`3[1 2]+`.returns`312`
    ensure`E[1 2]+`.returns`12`
  })

  it('[itm,itm] => [str]', () => {
    ensure`{def}\`ghi\`+`.returns`defghi`.withStack(CString)
    ensure`11 22+`.returns`1122`.withStack(CString)
  })
})
