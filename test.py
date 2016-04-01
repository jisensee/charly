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
        
if __name__ == "__main__":
    unittest.main()