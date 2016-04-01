import random

from iposTypes import String
from stack import Stack

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
