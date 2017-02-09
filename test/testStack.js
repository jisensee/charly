import { describe, it } from "mocha"
import {InvalidStackContentsError} from "../src/errors"

describe(`stack`, () => {
  describe(`/`, () => {
    it(`B<itm> A<itm>`, () => {
      `1 'a/`.returns`a1`;
      `1 'a//`.returns`1a`;
      `1 2/`.returns`21`;
    })
  })

  describe(`_`, () => {
    it(`A<itm>`, () => {
      `1 'a_`.returns`1aa`;
      `1 'a___`.returns`1aaaa`;
      `1_`.returns`11`;
    })
  })

  describe(`;`, () => {
    it(`A<itm>`, () => {
      `1 'a;`.returns`1`;
      `1 2 'a;;`.returns`1`;
      `1;`.returns``;
    })
  })

  describe(`@`, () => {
    it(`C<itm> B<itm> A<itm>`, () => {
      `1 'a 3@`.returns`a31`;
      `1 'a 3@@`.returns`31a`;
      `1 'a 3@@@`.returns`1a3`;
      `"abc" 1 2 'd {def}@@`.returns`abc1def2d`;
    })
  })

  describe(`$`, () => {
    it(`C<itm> B<itm> A<itm>`, () => {
      `1'a{bcd}1$`.returns`1abcda`;
      `1 2 3 3$`.returns`1231`;
      `1$`.throws(InvalidStackContentsError)
    })
  })
})
