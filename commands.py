from functions import *

# Commands with a # at the end of the line are covered by the unittests
commands = {
	# Stack manipulation
	"_" : IDuplicateTopStackItem,#
	";" : IDiscardTopStackItem,#
	"/" : ISwapTopStackItems,#
	"$" : ICopyStackItem,#
	"@" : IRotateTopStack,#
	
	# String processing
	"A" : ISortAsc,#
	"D" : ISortDesc,#
	"e" : IEval,#
	"h" : IFirstChar,
	"k" : ISwapCase,#
	"l" : ILowerCase,#
	"o" : ISort,
	"R" : IReplace,
	"r" : IReverse,
	"s" : IStrip,
	"u" : IUpperCase,#
	"v" : ILastChar,
	"w" : IWrap,
	"x" : IRemoveWithRegex,
	"y" : IAllButFirstChar,
	"z" : IAllButLastChar,
	"*" : IMultiply,
	"-" : IRemove,
	"+" : IConcatenate,
	":" : ISlice,
	"<" : IFirstChars,
	">" : ILastChars,
	
	# Functional programming
	"#" : IExecuteCommands,
	"~" : IApplyToChars,
	"%" : IApplyToParts,
	"?" : IApplyToPartsRandomly,	
	"a" : ISortAscWithKey,	
	"d" : ISortDescWithKey,
}
