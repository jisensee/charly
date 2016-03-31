import random

from errors import InvalidStackContentsException
from iposTypes import String
from stack import Stack


def popArguments(stack, modeList, arity, unpack = True):
    """
    Expects the stack, a modeList and an arity and returns the operands and the corrosponding mode  in the format
    [mode, operand1, operand2, ...]
    If unpack is True the values of the items are returned, otherwise the instances of the respective types are retuned
    The modeList has the following format:
    [{"types" : [int, str, ...], "name" : modeName}, ...]
    Each list element represents a mode in which the command can work depending on the argument types on the stack
    """
    
    if stack.getLength() < arity:
        message = "Expected %s items on the stack, but the stack only contains %s!" % (arity, stack.getLength())
        raise InvalidStackContentsException(message)

    # Take the top arity items from the stack
    topStack = stack.getTopItems(arity)
    topStackTypes = [type(i) for i in topStack]

    # Loop through all the modes and takes the first on that matches the stack types
    modeName = None
    for mode in modeList:
        if all(map(lambda t: isinstance(t[0], t[1]) , zip(topStack, mode["types"]))):
            modeName = mode["name"]
            break
            
    if modeName:
        return [modeName] + [stack.pop().value if unpack else stack.pop() for i in range(arity)][::-1]
    else:
        typesList = [m["types"] for m in modeList]
        message =  "Excepted one of the types %s on the stack, but got %s" % (typesList, topStackTypes)
        raise InvalidStackContentsException(message)

def applyCommands(commands, inputStr, rand = False):
    """
    Helper function for the map commands.
    Executes the given commands with the given input-string and returns the joined stack.
    If random is True, then the commands only get executed with a 50% chance.
    """
    from interpreter import run
    
    stack = Stack([String(inputStr)])
    
    if rand and random.choice([0, 1]) or not rand:
        result = run(commands, stack).join()
    else:
        result = stack.join()
    

    return result

def splitString(separator, s):
    """Splits s on separator. Also works for empty separators which then returns all characters of s"""
    
    splittedStr = s if separator == "" else s.split(separator)
    
    return splittedStr

def sortAscWithKey(toSort, separator, keyCommand, reverse = False):
    """
    Splits the given string on the given separator, applies the keyCommand to each part, sorts
    the parts ascending based on this and joins the parts back on the separator.
    If reverse is true, the sorting is descending.
    Returns the sorted string.
    
    """
    splittedStr = splitString(separator, toSort)
        
    # Apply  mapping function to all substrings
    mappingStrings = map(lambda c: applyCommands(keyCommand, c), splittedStr)
    
    def getKey(mappingString):
        """Map a mapping string to its key value"""
        # Remove every non-digit from the mapping string
        digits = "".join(filter(lambda c: c.isdigit(), mappingString))
        
        # If there were digits in the string, convert them to int
        if digits != "":
            key = int(digits)
        # otherwise use the length of the mapping string as key
        else:
            key = len(mappingString)
        
        return key
    
    keyList = map(getKey, mappingStrings)
    
    # zip splittedStr and keyList together, sort the resulting list by the keyList-part,
    # only take the mappingString-part of the sorted result and join back on B
    zipped = zip(splittedStr, keyList)
    sortedList = sorted(zipped, key=lambda t: t[1], reverse=reverse)
    return separator.join(map(lambda t: t[0], sortedList))
