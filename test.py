import unittest
from interpreter import run
from stack import Stack
from errors import InvalidStackContentsException, InvalidVariableNameException, InvalidEvalStringException


def runCode(code):
    stack = Stack()
    stack.content = []
    return run(code, stack).join()

"""
Each test method is named the same as the tested function with a leading 'test'.
This makes is easier to find a particular test method.
"""

class Test(unittest.TestCase):

    def testLiteralPushing(self):
        self.assertEqual(runCode(r""" """), "")
        self.assertEqual(runCode(r"""1 2 3"""), "123")
        self.assertEqual(runCode(r"""1'a2"""), "1a2")
        self.assertEqual(runCode(r"""'a!r1"abc"3"""), "ar1abc3")
        self.assertEqual(runCode(r"""1"abc""abc" 'a2`def`"ghi"""), "1abcabca2defghi")
        self.assertEqual(runCode(r"""  "abc"'a`def """), "abcadef ")
             
     
    def testVariableAssignment(self):
        self.assertEqual(runCode(r"""1'X=X"""), "11")
        self.assertEqual(runCode(r"""1`def`'c=c c   c"""), "1defdefdefdef")
        with self.assertRaises(InvalidVariableNameException): runCode(""" "abc""def"=""")
        with self.assertRaises(InvalidStackContentsException): runCode("""1=""")
        with self.assertRaises(InvalidStackContentsException): runCode("""1 `def`=""")
        with self.assertRaises(InvalidStackContentsException): runCode("""=""")
        with self.assertRaises(InvalidStackContentsException): runCode("""1 1=""")
         
    def testIDuplicateTopStackItem(self):
        self.assertEqual(runCode(r"""1 2_"""), "122")
        self.assertEqual(runCode(r"""1"abc"_"""), "1abcabc")
        self.assertEqual(runCode(r"""1"abc"`def`_'l_ """), "1abcdefdefll")
        with self.assertRaises(InvalidStackContentsException): runCode("""_""") 
         
    def testIDiscardTopStackItem(self):
        self.assertEqual(runCode(r"""1 2;"""), "1")
        self.assertEqual(runCode(r"""1 2;3;; """), "")
        with self.assertRaises(InvalidStackContentsException): runCode(";")
        with self.assertRaises(InvalidStackContentsException): runCode("""1 "abc" 3;'a`def`;;;;;;""")
        
    def testIRotateTopStack(self):
        self.assertEqual(runCode(r"""1 2 3@"""), "231")
        self.assertEqual(runCode(r""" "abc" 1 2 'd `def`@@"""), "abc1def2d")
        with self.assertRaises(InvalidStackContentsException): runCode("""1 2@""")
    
    def testISwapTopStackItems(self):
        self.assertEqual(runCode(r"""1 2/"""), "21")
        self.assertEqual(runCode(r"""`ab`'c//"""), "abc")
        with self.assertRaises(InvalidStackContentsException): runCode("""1/""")
        with self.assertRaises(InvalidStackContentsException): runCode("""/""")

    def testICopyStackItem(self):
        self.assertEqual(runCode(r"""1'a`bcd`1$"""), "1abcda")
        self.assertEqual(runCode(r"""1 2 3 3$"""), "1231")
        with self.assertRaises(InvalidStackContentsException): runCode("""$""")
        with self.assertRaises(InvalidStackContentsException): runCode("""'a$""")
        
    def testISortAsc(self):
        self.assertEqual(runCode(r""" ".abc.Def.123a.aB."'.A"""), "..123a.Def.aB.abc")
        with self.assertRaises(InvalidStackContentsException): runCode("""A""")
        with self.assertRaises(InvalidStackContentsException): runCode("""1 2 !aA""")
        
    def testISortDesc(self):
        self.assertEqual(runCode(r""" ".abc.Def.123a.aB."'.D"""), "abc.aB.Def.123a..")
        with self.assertRaises(InvalidStackContentsException): runCode("""D""")
        with self.assertRaises(InvalidStackContentsException): runCode("""1 2 !aD""")
        
    def testISort(self):
        self.assertEqual(runCode(r""" "uk jXs2d1AN"o"""), " 12ANXdjksu")
        self.assertEqual(runCode(r""" "u"o"""), "u")
        self.assertEqual(runCode(r""" Eo"""), "")
        with self.assertRaises(InvalidStackContentsException): runCode("""o""")
        with self.assertRaises(InvalidStackContentsException): runCode("""1 2o""")
        
    def testIEval(self):
        self.assertEqual(runCode(r""" "1"e"""), "1")
        self.assertEqual(runCode(r""" "1+1"e"""), "2")
        self.assertEqual(runCode(r""" "3+4/2"e"""), "5")
        self.assertEqual(runCode(r""" "(3+4)/2*2-4"e"""), "2")
        self.assertEqual(runCode(r""" "(3+0004)/2*a2fds-4"e"""), "2")
        with self.assertRaises(InvalidStackContentsException): runCode("""e""")
        with self.assertRaises(InvalidStackContentsException): runCode("""1 2e""")
        with self.assertRaises(InvalidEvalStringException): runCode(r""" "1(("e""")
        
    def testISwapCase(self):
        self.assertEqual(runCode(r""" 'ak"""), "A")
        self.assertEqual(runCode(r""" "1"k"""), "1")
        self.assertEqual(runCode(r""" "1aBc#Zx"k"""), "1AbC#zX")
        with self.assertRaises(InvalidStackContentsException): runCode("""k""")
        with self.assertRaises(InvalidStackContentsException): runCode("""2k""")
        
    def testILowerCase(self):
        self.assertEqual(runCode(r""" 'Akl"""), "a")
        self.assertEqual(runCode(r""" "1"l"""), "1")
        self.assertEqual(runCode(r""" "1aBc#Zx"l"""), "1abc#zx")
        with self.assertRaises(InvalidStackContentsException): runCode("""l""")
        with self.assertRaises(InvalidStackContentsException): runCode("""2l""")
        
    def testIUpperCase(self):
        self.assertEqual(runCode(r""" 'au"""), "A")
        self.assertEqual(runCode(r""" "1"u"""), "1")
        self.assertEqual(runCode(r""" "1aBc#Zx"u"""), "1ABC#ZX")
        with self.assertRaises(InvalidStackContentsException): runCode("""u""")
        with self.assertRaises(InvalidStackContentsException): runCode("""2u""")
        
    def testIReverse(self):
        self.assertEqual(runCode(r""" "abc"r"""), "cba")
        self.assertEqual(runCode(r""" "A"r"""), "A")
        with self.assertRaises(InvalidStackContentsException): runCode("""r""")
        with self.assertRaises(InvalidStackContentsException): runCode("""1r""")
        
    def testIFirstChar(self):
        self.assertEqual(runCode(r""" "abc"h"""), "a")
        self.assertEqual(runCode(r"""Er"""), "")
        self.assertEqual(runCode(r"""1h"""), "2")
        with self.assertRaises(InvalidStackContentsException): runCode("""h""")
        with self.assertRaises(InvalidStackContentsException): runCode("""!rh""")
        
    def testILastChar(self):
        self.assertEqual(runCode(r""" "abc"v"""), "c")
        self.assertEqual(runCode(r"""Ev"""), "")
        self.assertEqual(runCode(r"""2v"""), "1")
        with self.assertRaises(InvalidStackContentsException): runCode("""v""")
        with self.assertRaises(InvalidStackContentsException): runCode("""!rv""")
        
    def testIFirstChars(self):
        self.assertEqual(runCode(r""" "abc"2<"""), "ab")
        self.assertEqual(runCode(r"""E2<"""), "")
        self.assertEqual(runCode(r""" "abc"4< """), "a")
        with self.assertRaises(InvalidStackContentsException): runCode("""<""")
        with self.assertRaises(InvalidStackContentsException): runCode("""!1>""")
        
    def testILastChars(self):
        self.assertEqual(runCode(r""" "abc"2>"""), "bc")
        self.assertEqual(runCode(r"""E2<"""), "")
        self.assertEqual(runCode(r""" "abc"4> """), "c")
        with self.assertRaises(InvalidStackContentsException): runCode(""">""")
        with self.assertRaises(InvalidStackContentsException): runCode("""!1>""")
        
    def testIAllButFirstChar(self):
        self.assertEqual(runCode(r""" "abc"y"""), "bc")
        self.assertEqual(runCode(r""" "a"y"""), "")
        with self.assertRaises(InvalidStackContentsException): runCode("""y""")
        with self.assertRaises(InvalidStackContentsException): runCode("""1y""")
        
    def testIAllButLastChar(self):
        self.assertEqual(runCode(r""" "abc"z"""), "ab")
        self.assertEqual(runCode(r""" "a"z"""), "")
        with self.assertRaises(InvalidStackContentsException): runCode("""z""")
        with self.assertRaises(InvalidStackContentsException): runCode("""1z""")
        
    def testIWrap(self):
        self.assertEqual(runCode(r""" "a\n\nds\nasd"w"""), "adsasd")
        self.assertEqual(runCode(r""" "\n"w"""), "")
        self.assertEqual(runCode(r""" " \n "w"""), "  ")
        with self.assertRaises(InvalidStackContentsException): runCode("""w""")
        with self.assertRaises(InvalidStackContentsException): runCode("""1w""")
        
    def testIStrip(self):
        self.assertEqual(runCode(r"""  "abcdefabc" "abc"s"""), "def")
        self.assertEqual(runCode(r""" "abc"'as  """), "bc")
        self.assertEqual(runCode(r""" "abc""def"s"""), "abc")        
        self.assertEqual(runCode(r""" "abcefgh"2s"""), "cef")
        self.assertEqual(runCode(r""" "abcefgh"0s"""), "abcefgh")
        with self.assertRaises(InvalidStackContentsException): runCode("""s""")
        with self.assertRaises(InvalidStackContentsException): runCode("""1s""")
        with self.assertRaises(InvalidStackContentsException): runCode("""!v1s""")
        
    def testIMultiply(self):
        self.assertEqual(runCode(r""" "abcd"2*"""), "aabbccdd")
        self.assertEqual(runCode(r""" "abc"0*"""), "")
        self.assertEqual(runCode(r""" E2*"""), "")
        with self.assertRaises(InvalidStackContentsException): runCode("""*""")
        with self.assertRaises(InvalidStackContentsException): runCode("""`abc`1*""")
        
    def testIRemove(self):
        self.assertEqual(runCode(r""" "abcdef""cde"-"""), "abf")
        self.assertEqual(runCode(r""" "abcdef"E-"""), "abcdef")
        self.assertEqual(runCode(r""" "abc def""ghijkl"-"""), "abc def")
        self.assertEqual(runCode(r""" "abcdef"2-"""), "bdf")
        self.assertEqual(runCode(r""" "abcdef"1-"""), "")
        self.assertEqual(runCode(r""" "abcf"0-"""), "abcf")        
        with self.assertRaises(InvalidStackContentsException): runCode("""-""")
        with self.assertRaises(InvalidStackContentsException): runCode("""1 1-""")
        
    def testIExecuteCommands(self):
        self.assertEqual(runCode(r""" "abc"!r# """), "cba")
        self.assertEqual(runCode(r""" "abc"`rh`# """), "c")
        with self.assertRaises(InvalidStackContentsException): runCode("""1#""")
        with self.assertRaises(InvalidStackContentsException): runCode("""#""")
        
    def testIApplyToChars(self):
        self.assertEqual(runCode(r""" "aBc"!k~ """), "AbC")
        self.assertEqual(runCode(r""" "abcdabcd"`"ab"-`~ """), "cdcd")
        with self.assertRaises(InvalidStackContentsException): runCode("""1~""")
        with self.assertRaises(InvalidStackContentsException): runCode("""~""")
    
    def testIApplyToParts(self):
        self.assertEqual(runCode(r""" "abc.def.ghi"'.!r% """), "cba.fed.ihg")
        self.assertEqual(runCode(r""" "abc.def.ghi."'.!r% """), "cba.fed.ihg.")
        self.assertEqual(runCode(r""" "abc.-def.-ghi"".-"`rh`% """), "c.-f.-i")
        with self.assertRaises(InvalidStackContentsException): runCode("""1%""")
        with self.assertRaises(InvalidStackContentsException): runCode("""%""")
    
    def testIApplyToPartsRandomly(self):
        with self.assertRaises(InvalidStackContentsException): runCode("""1?""")
        with self.assertRaises(InvalidStackContentsException): runCode("""?""")
    
        
if __name__ == "__main__":
    unittest.main()
