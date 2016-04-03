from functions import *

# Commands with a # at the end of the line are covered by the unittests
commands = {
	"A" : ISortAsc,#
	"a" : ISortAscWithKey,
	"D" : ISortDesc,#
	"d" : ISortDescWithKey,
	"e" : IEval,#
	"h" : IFirstChar,#
	"k" : ISwapCase,#
	"l" : ILowerCase,#
	"o" : ISort,
	"R" : IReplace,
	"r" : IReverse,#
	"s" : IStrip,
	"u" : IUpperCase,#
	"v" : ILastChar,#
	"w" : IWrap,
	"x" : IRemoveWithRegex,
	"y" : IAllButFirstChar,
	"z" : IAllButLastChar,
	"*" : IMultiply,
	"-" : IRemove,
	"+" : IConcatenate,
	":" : ISlice,
	"<" : IFirstChars,#
	">" : ILastChars,#
	"_" : IDuplicateTopStackItem,#
	";" : IDiscardTopStackItem,#
	"/" : ISwapTopStackItems,#
	"$" : ICopyStackItem,#
	"@" : IRotateTopStack,#
	"#" : IExecuteCommands,
	"~" : IApplyToChars,
	"%" : IApplyToParts,
	"?" : IApplyToPartsRandomly,	
}
