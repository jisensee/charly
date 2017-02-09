import { expect } from "chai"
import ipos from "../src"

String.prototype.withInput = function(input) {
  return {
    returns: expectedOutput => {
      expect(ipos.runCode(this, input[0])).to.equal(expectedOutput[0])
    },
    throws: expectedError => {
      expect(() => ipos.runCode(this, input[0])).to.throw(expectedError)
    }
  };
};

String.prototype.returns = function(expectedOutput) {
  expect(ipos.runCode(this)).to.equal(expectedOutput[0])
};

String.prototype.throws = function(expectedError) {
  expect(() => ipos.runCode(this)).to.throw(expectedError)
};
