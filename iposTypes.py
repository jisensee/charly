class Meta(type):
	def __repr__(self):
		
		if self.__name__ == "Item":
			return "<item>"
		elif self.__name__ == "Integer":
			return "<int>"
		elif self.__name__ == "String":
			return "<str>"
		elif self.__name__ == "Array":
			return "<arr>"
		elif self.__name__ == "Command":
			return "<cmd>"
		elif self.__name__ == "Regex":
			return "<rgx>"

			
class Item(metaclass=Meta):
	def __init__(self, value):
		self.value = value
		self.__metaclass__ = Meta
		
	def __str__(self):
		return str(self.value)
		

class Integer(Item, metaclass=Meta):
	pass
		
class String(Item, metaclass=Meta):
	pass
	
class Array(Item, metaclass=Meta):
	def __str__(self):
		return "".join([str(i) for i in self.value])

class Command(Item, metaclass=Meta):
	pass

class Regex(Item, metaclass=Meta):
	pass