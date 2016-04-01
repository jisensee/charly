from functions import *

commands = {
	# Stack manipulation
	"_" : IDuplicateTopStackItem,
	";" : IDiscardTopStackItem,
	"/" : ISwapTopStackItems,
	"$" : ICopyStackItem,
	"@" : IRotateTopStack,
	
	# String processing
	"A" : ISortAsc,
	"D" : ISortDesc,
	"e" : IEval,
	"k" : ISwapCase,
	"l" : ILowerCase,
	"o" : ISort,
	"R" : IReplace,
	"r" : IReverse,
	"s" : IStrip,
	"u" : IUpperCase,
	"w" : IWrap,	
	"*" : IMultiply,	
	"-" : IRemove,
	"+" : IConcatenate,
	":" : ISlice,
	"<" : IFirstChars,
	">" : ILastChars,
	"h" : IFirstChar,
	"v" : ILastChar,
	"y" : IAllButFirstChar,
	"z" : IAllButLastChar,
	
	# Functional programming
	"#" : IExecuteCommands,
	"~" : IApplyToChars,
	"%" : IApplyToParts,
	"?" : IApplyToPartsRandomly,	
	"a" : ISortAscWithKey,	
	"d" : ISortDescWithKey,
}
