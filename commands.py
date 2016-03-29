from functions import *

commands = {
	"#" : IClearStack,
	"_" : IDuplicateTopStackItem,
	";" : IDiscardTopStackItem,
	"~" : ISwapTopStackItems,
	"$" : ICopyStackItem,
	"@" : IRotateTopStack,
	":" : IReverseStack,
	"e" : IEval,
	"r" : IReverse,
	"s" : IStrip,
	"w" : IWrap,
	"R" : IReplace,
	"*" : IMultiply,
}
