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
	
	# Functional programming
	"#" : IExecuteCommands,
	"~" : IApplyToChars,
	"%" : IApplyToParts,
	"?" : IApplyToPartsRandomly,
}
