from iposTypes import Integer, String, Command

class Stack:
    """Represents one stack"""
    
    def __init__(self, initialContent=[]):
        """
        Initialize the stack with the given contents.
        If content is not given the stack is empty.
        """
        self.content = initialContent
        
        
    def join(self):
        """"Converts every item to string and joins them bottom to top."""
        return "".join([str(i.value) for i in self.content])
    
    
    def pushString(self, string):
        """Push a string to the stack"""
        self.content.append(String(string))
      
        
    def pushInteger(self, integer):
        """Push an integer to the stack"""
        self.content.append(Integer(integer))
       
        
    def pushCommand(self, command):
        """Push a command to the stack"""
        self.content.append(Command(command))
       
        
    def push(self, item):
        """
        Push the item as it is to the stack.
        It has to be ensured that it is already one of the IposTypes.
        """
        self.content.append(item)
        
        
    def pop(self):
        """Returns the top element from the stack and removes it"""
        return self.content.pop()
        
        
    def getItem(self, index):
        """Returns the item at the given index."""
        return self.content[index]
    
    
    def getTopItems(self, count):
        """
        Returns the given amount of items from the top.
        The top item is last in this list.
        """
        return self.content[-count:]
    
    
    def getLength(self):
        """Returns the amount of items in the stack"""
        return len(self.content)
