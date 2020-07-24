open CommandDocGenTypes;

let commands: list(command) = [
  {
    key: "_",
    name: "duplicate",
    modes: [
      {
        args: [Item],
        result: [Item, Item],
        description: "Duplicate the top stack item",
        implemented: true,
      },
    ],
  },
  {
    key: ";",
    name: "discard",
    modes: [
      {
        args: [Item],
        result: [],
        description: "Discard the top stack item.",
        implemented: true,
      },
    ],
  },
  {
    key: "@",
    name: "rotate",
    modes: [
      {
        args: [Item, Item, Item],
        result: [Item, Item, Item],
        description: "Push the 3rd item to the top and shift the other two down.",
        implemented: false,
      },
    ],
  },
  {
    key: "~",
    name: "swap",
    modes: [
      {
        args: [Item],
        result: [Item],
        description: "Swaps the top two stack items.",
        implemented: false,
      },
    ],
  },
  {
    key: "$",
    name: "copy",
    modes: [
      {
        args: [Int],
        result: [Item],
        description: "Copies the item with the index A to the top of the stack with index 0 being the bottom item. If there is no item at the give index, nothing is pushed.",
        implemented: false,
      },
    ],
  },
  {
    key: "+",
    name: "add",
    modes: [
      {
        args: [List, List],
        result: [List],
        description: "Append A to the end of B.",
        implemented: false,
      },
      {
        args: [String, String],
        result: [String],
        description: "Append A to the end of B.",
        implemented: true,
      },
      {
        args: [Int, Int],
        result: [Int],
        description: "Add A and B.",
        implemented: true,
      },
    ],
  },
  {
    key: "h",
    name: "head",
    modes: [
      {
        args: [Int],
        result: [Int],
        description: "Increment A.",
        implemented: true,
      },
      {
        args: [List],
        result: [String],
        description: "Get the first element of A. Does nothing if A is empty.",
        implemented: false,
      },
      {
        args: [String],
        result: [String],
        description: "Get the first char of A. Does nothing if A is empty.",
        implemented: false,
      },
    ],
  },
  {
    key: "k",
    name: "swapCase",
    modes: [
      {
        args: [List],
        result: [List],
        description: "Swap the case of every string in A.",
        implemented: false,
      },
      {
        args: [String],
        result: [String],
        description: "Swap the case of every char in A.",
        implemented: false,
      },
    ],
  },
  {
    key: "l",
    name: "lowercase",
    modes: [
      {
        args: [List],
        result: [List],
        description: "Lowercase every string in A.",
        implemented: false,
      },
      {
        args: [String],
        result: [String],
        description: "Lowercase A.",
        implemented: false,
      },
    ],
  },
  {
    key: "r",
    name: "reverse",
    modes: [
      {
        args: [List],
        result: [List],
        description: "Reverse A.",
        implemented: false,
      },
      {
        args: [String],
        result: [String],
        description: "Reverse A.",
        implemented: false,
      },
      {
        args: [Int],
        result: [Int],
        description: "Reverse the digits of A. Leading zeros are removed.",
        implemented: false,
      },
    ],
  },
  {
    key: "L",
    name: "length",
    modes: [
      {
        args: [List],
        result: [List],
        description: "Get the length of A.",
        implemented: false,
      },
      {
        args: [String],
        result: [String],
        description: "Get the length of A.",
        implemented: false,
      },
      {
        args: [Int],
        result: [Int],
        description: "Get the number of digits of A.",
        implemented: false,
      },
    ],
  },
  {
    key: "u",
    name: "uppercase",
    modes: [
      {
        args: [List],
        result: [List],
        description: "Uppercase every string in A.",
        implemented: false,
      },
      {
        args: [String],
        result: [String],
        description: "Uppercase A.",
        implemented: false,
      },
    ],
  },
  {
    key: "v",
    name: "last",
    modes: [
      {
        args: [List],
        result: [List],
        description: "Get the last string of A. Does nothing if A is empty.",
        implemented: false,
      },
      {
        args: [String],
        result: [String],
        description: "Get the last char of A. Does nothing if A is empty.",
        implemented: false,
      },
      {
        args: [Int],
        result: [Int],
        description: "Decrement A, but not below zero.",
        implemented: false,
      },
    ],
  },
  {
    key: "t",
    name: "tail",
    modes: [
      {
        args: [List],
        result: [List],
        description: "Get all but the first element of A. Does nothing if the length of A is <2.",
        implemented: false,
      },
      {
        args: [String],
        result: [String],
        description: "Get all but the first char of A. Does nothing if the length of A is <2.",
        implemented: false,
      },
      {
        args: [Int],
        result: [Int],
        description: "Get all but the first digit of A. Does nothing if the length of A is <2.",
        implemented: false,
      },
    ],
  },
  {
    key: "z",
    name: "allButLast",
    modes: [
      {
        args: [List],
        result: [List],
        description: "Get all but the last element of A. Does nothing if the length of A is <2.",
        implemented: false,
      },
      {
        args: [String],
        result: [String],
        description: "Get all but the last char of A. Does nothing if the length of A is <2.",
        implemented: false,
      },
      {
        args: [Int],
        result: [Int],
        description: "Get all but the last digit of A. Does nothing if the length of A is <2.",
        implemented: false,
      },
    ],
  },
];
