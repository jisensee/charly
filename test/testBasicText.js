import { describe, it } from "mocha"
import * as errors from "../src/errors"

describe(`basicText`, () => {
  describe(`l`, () => {
    it(`A<str>`, () => {
      `l`.withInput`ABC`.returns`abc`;
      `l`.withInput`ABc`.returns`abc`;
      `l`.withInput`abc`.returns`abc`;
    })
  })

  describe(`r`, () => {
    it(`A<str>`, () => {
      `r`.withInput`abc`.returns`cba`;
      `r`.withInput`bb`.returns`bb`;
    })
  })

  describe(`u`, () => {
    it(`A<str>`, () => {
      `u`.withInput`abc`.returns`ABC`;
      `u`.withInput`ABc`.returns`ABC`;
      `u`.withInput`ABC`.returns`ABC`;
    })
  })

  describe(`+`, () => {
    it(`B<itm> A<itm>`, () => {
      `'a"bc"+`.returns`abc`;
      `1'a+`.returns`1a`;
      `{def}\`ghi\`+`.returns`defghi`;
      `11 22'c++`.returns`1122c`;
    })
  })
})
