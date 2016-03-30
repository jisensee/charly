class Meta(type):
	def __repr__(c):
		
		if c.__name__ == "Item":
			return "<item>"
		elif c.__name__ == "Integer":
			return "<int>"
		elif c.__name__ == "String":
			return "<str>"
		elif c.__name__ == "Commands":
			return "<cmd>"

			
class Item(metaclass=Meta):
	def __init__(self, value):
		self.value = value
		self.__metaclass__ = Meta
		
		
class Integer(Item, metaclass=Meta):
	pass
		
		
class String(Item, metaclass=Meta):
	pass
	
	
class Commands(Item, metaclass=Meta):
	pass
