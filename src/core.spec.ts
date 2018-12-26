import { ensure } from 'charly/testHelper'
import { describe, it } from 'mocha'
import {
  CommandNotFinishedError,
  InvalidStackContentsError,
  ListNotFinishedError,
  MissingVariableNameError,
} from './errors'
import { CCommand, CInteger, CList, CRegex, CString } from './types'

// tslint:disable:no-unused-expression

describe('core', () => {
  it('pushing simple literals', () => {
    ensure` `.returns``.withStack()
    ensure`1 2 3`.returns`123`.withStack(CInteger, CInteger, CInteger)
    ensure`12 3`.returns`123`.withStack(CInteger, CInteger)
    ensure`1'a2`.returns`1a2`.withStack(CInteger, CString, CInteger)
    ensure`"abc""def"`.returns`abcdef`.withStack(CString, CString)
    ensure`'a!r1"abc"3`.returns`ar1abc3`.withStack(
      CString,
      CCommand,
      CInteger,
      CString,
      CInteger,
    )
    ensure`´abc´def´2 "ghi"`.returns`abcdef2ghi`.withStack(
      CString,
      CString,
      CInteger,
      CString,
    )
    ensure`1"abc""abc" 'a2{def}"ghi"\`def\``
      .returns`1abcabca2defghidef`.withStack(
      CInteger,
      CString,
      CString,
      CString,
      CInteger,
      CCommand,
      CString,
      CRegex,
    )
  })

  it('pushing lists', () => {
    ensure`[1 3 "abc"]`.returns`13abc`.withStack(CList)
    ensure`[1[2 3['a"abc"]3]8]`.returns`123aabc38`.withStack(CList)
    ensure`[]`.returns``.withStack(CList)
    ensure`[1`.throws(ListNotFinishedError)
    ensure`[[[1]2]`.throws(ListNotFinishedError)
  })

  it('pushing commands', () => {
    ensure`{1 3 "abc"}`.returns`1 3 "abc"`.withStack(CCommand)
    ensure`{1{2 3{'a"abc"}3}8}`.returns`1{2 3{'a"abc"}3}8`.withStack(CCommand)
    ensure`!a`.returns`a`.withStack(CCommand)
    ensure`{1`.throws(CommandNotFinishedError)
    ensure`{{{1}2}`.throws(CommandNotFinishedError)
  })

  it('variable assignment', () => {
    ensure`"abc"=A`.returns`abc`.withStack(CString)
    ensure`"abc"=AA`.returns`abcabc`.withStack(CString, CString)
    ensure`=A`.throws(InvalidStackContentsError)
    ensure`=`.withInput`abc'`.throws(MissingVariableNameError)
  })
})
