open Jest;
open Expect;
open ParserToken;

let run = code => code->Code.fromString->Parser.parse;
let expectOk = (code, expectedTokens, ()) =>
  expect(run(code)) |> toEqual(expectedTokens->Result.Ok);
let expectError = (code, expectedError, ()) =>
  expect(run(code)) |> toEqual(expectedError->Result.Error);

describe("Parser.parse", () => {
  test(
    "parses chars",
    expectOk("'a'b", [String(0, "a"), String(2, "b")]),
  );
  test(
    "fails on incomplete char literal",
    expectError("'", Error.IncompleteCharLiteral),
  );

  test("parses strings", expectOk("\"abc\"", [String(0, "abc")]));
  test(
    "parses strings with escaped quotes",
    expectOk("\"a\\\"b", [String(0, "a\"b")]),
  );
  test("parses open ended strings", expectOk("\"abc", [String(0, "abc")]));
});
