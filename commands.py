from functions import *

commands = {
	# Stack manipulation
	"#" : IClearStack,
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
	"s" : ISwapCase,
	
	# Functional programming
	"{" : IPushCommands,
	"}" : IExecuteCommands,
	"~" : IApplyToChars,
	"%" : IApplyToParts,
	"?" : IApplyToPartsRandomly,
}
