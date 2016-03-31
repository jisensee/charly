from functions import *

commands = {
	# Stack manipulation
	"_" : IDuplicateTopStackItem,
	";" : IDiscardTopStackItem,
	"/" : ISwapTopStackItems,
	"$" : ICopyStackItem,
	"@" : IRotateTopStack,
	":" : IReverseStack,
	
	# String processing
	"e" : IEval,
	"r" : IReverse,
	"s" : IStrip,
	"w" : IWrap,
	"R" : IReplace,
	"*" : IMultiply,
	"k" : ISwapCase,
	"-" : IRemove,
	"+" : IConcatenate,
	
	# Functional programming
	"#" : IExecuteCommands,
	"~" : IApplyToChars,
	"%" : IApplyToParts,
	"?" : IApplyToPartsRandomly,
	"A" : ISortAsc,
	"a" : ISortAscWithKey,
	"D" : ISortDesc,
	"d" : ISortDescWithKey,
	"o" : ISort,
}
