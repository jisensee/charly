import unittest
from interpreter import run
from stack import Stack
from errors import InvalidStackContentsException, InvalidVariableNameException


def runCode(code):
    stack = Stack()
    stack.content = []
    return run(code, stack).join()


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
         
    def testDuplicateTopStackItem(self):
        self.assertEqual(runCode(r"""1 2_"""), "122")
        self.assertEqual(runCode(r"""1"abc"_"""), "1abcabc")
        self.assertEqual(runCode(r"""1"abc"`def`_'l_ """), "1abcdefdefll")
        with self.assertRaises(InvalidStackContentsException): runCode("""_""") 
         
    def testDiscardTopStackItem(self):
        self.assertEqual(runCode(r"""1 2;"""), "1")
        self.assertEqual(runCode(r"""1 2;3;; """), "")
        with self.assertRaises(InvalidStackContentsException): runCode(";")
        with self.assertRaises(InvalidStackContentsException): runCode("""1 "abc" 3;'a`def`;;;;;;""")
        
    def testRotateTopStack(self):
        self.assertEqual(runCode(r"""1 2 3@"""), "231")
        self.assertEqual(runCode(r""" "abc" 1 2 'd `def`@@"""), "abc1def2d")
        with self.assertRaises(InvalidStackContentsException): runCode("""1 2@""")
    
    def testSwapTopStackItems(self):
        self.assertEqual(runCode(r"""1 2/"""), "21")
        self.assertEqual(runCode(r"""`ab`'c//"""), "abc")
        with self.assertRaises(InvalidStackContentsException): runCode("""1/""")
        with self.assertRaises(InvalidStackContentsException): runCode("""/""")

    def testCopyStackItem(self):
        self.assertEqual(runCode(r"""1'a`bcd`1$"""), "1abcda")
        self.assertEqual(runCode(r"""1 2 3 3$"""), "1231")
        with self.assertRaises(InvalidStackContentsException): runCode("""$""")
        with self.assertRaises(InvalidStackContentsException): runCode("""'a$""")
        
        
if __name__ == "__main__":
    unittest.main()