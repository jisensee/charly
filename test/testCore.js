import { describe, it } from "mocha"
import * as errors from "../src/errors"

describe(`core`, () => {
  it(`pushing literals`, () => {
    ` `.returns``;
    `1 2 3`.returns`123`;
    `12 3`.returns`123`;
    `1'a2`.returns`1a2`;
    `"abc""def"`.returns`abcdef`;
    `'a!r1"abc"3`.returns`ar1abc3`;
    `´abc´def´2 "ghi"`.returns`abcdef2ghi`;
    `1"abc""abc" 'a2{def}"ghi"\`def\``.returns`1abcabca2defghidef`;
  })

  it(`variable assignment`, () => {
    `"abc"=A`.returns`abc`;
    `"abc"=AA`.returns`abcabc`;
    `=A`.throws(errors.InvalidStackContentsError);
    `=`.withInput("abc").throws(errors.MissingVariableNameError);
  })
})
