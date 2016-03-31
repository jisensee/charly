class Meta(type):
	def __repr__(self):
		
		if self.__name__ == "Item":
			return "<item>"
		elif self.__name__ == "Integer":
			return "<int>"
		elif self.__name__ == "String":
			return "<str>"
		elif self.__name__ == "Command":
			return "<cmd>"

			
class Item(metaclass=Meta):
	def __init__(self, value):
		self.value = value
		self.__metaclass__ = Meta
		
		
class Integer(Item, metaclass=Meta):
	pass
		
		
class String(Item, metaclass=Meta):
	pass
	
	
class Command(Item, metaclass=Meta):
	pass
