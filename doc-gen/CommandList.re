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
    key: "/",
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
  {
    key: "s",
    name: "split",
    modes: [
      {
        args: [Regex, String],
        result: [List],
        description: "Split B on the matches of A and push a list of the resulting substrings while discarding empty ones.",
        implemented: false,
      },
      {
        args: [String, String],
        result: [List],
        description: "Split B on every occurence of A and push a list of the resulting substrings while discarding empty ones.",
        implemented: false,
      },
      {
        args: [Int, String],
        result: [List],
        description: "Split B into pieces of length A with the last elements being shorts if neccessary.",
        implemented: false,
      },
      {
        args: [String, Int],
        result: [List],
        description: "Split A into B pieces of equal length with the first element being longer if neccessary.",
        implemented: false,
      },
      {
        args: [Command, String],
        result: [List],
        description: "Split B on newlines and apply A to each element.",
        implemented: false,
      },
    ],
  },
  {
    key: "-",
    name: "remove",
    modes: [
      {
        args: [String, String],
        result: [String],
        description: "Remove all occurences of A in B.",
        implemented: false,
      },
      {
        args: [Int, String],
        result: [String],
        description: "Remove very Ath character in B.",
        implemented: false,
      },
    ],
  },
  {
    key: ":",
    name: "slice",
    modes: [
      {
        args: [Int, Int, String],
        result: [String],
        description: "Slice out a substring of C from index B (inclusive) to A (exclusive).",
        implemented: false,
      },
    ],
  },
  {
    key: "<",
    name: "takeFirst",
    modes: [
      {
        args: [Int, String],
        result: [String],
        description: "Take the first A characters from B. Do nothing if B is empty.",
        implemented: false,
      },
    ],
  },
  {
    key: ">",
    name: "takeLast",
    modes: [
      {
        args: [Int, String],
        result: [String],
        description: "Take the last A characters from B. Do nothing if B is empty.",
        implemented: false,
      },
    ],
  },
  {
    key: "m",
    name: "map",
    modes: [
      {
        args: [Command, String],
        result: [String],
        description: "Apply A to every character of B.",
        implemented: false,
      },
      {
        args: [Command, List],
        result: [String],
        description: "Apply A to every string of B.",
        implemented: false,
      },
    ],
  },
  {
    key: "i",
    name: "parseInt",
    modes: [
      {
        args: [Int],
        result: [String],
        description: "Convert A to a string.",
        implemented: false,
      },
      {
        args: [String],
        result: [Int],
        description: "Convert a to an int. Non-digit characters are removed before. Pushes nothing if no digit characters are present in A.",
        implemented: false,
      },
      {
        args: [List],
        result: [Int],
        description: "Convert A to a string and then to an int following the same rules as the string variant.",
        implemented: false,
      },
    ],
  },
  {
    key: "*",
    name: "repeat",
    modes: [
      {
        args: [Int, String],
        result: [String],
        description: "Repeat B A times.",
        implemented: false,
      },
      {
        args: [String, Int],
        result: [String],
        description: "Repeat every character in A B times.",
        implemented: false,
      },
    ],
  },
  {
    key: "#",
    name: "execute",
    modes: [
      {
        args: [Command],
        result: [],
        description: "Execute A by using the current stack.",
        implemented: false,
      },
    ],
  },
  {
    key: "~",
    name: "splitMap",
    modes: [
      {
        args: [Command, String, String],
        result: [String],
        description: "Split C on B, apply A to every part of the result and join the mapped parts back on B whle discarding empty parts.",
        implemented: false,
      },
      {
        args: [Command, Regex, String],
        result: [String],
        description: "Split C on all matches of B, apply A to every part of the result and join the mapped parts back on matches groups. Empty strings are not discarded here.",
        implemented: false,
      },
    ],
  },
  {
    key: "j",
    name: "join",
    modes: [
      {
        args: [String, List],
        result: [String],
        description: "Join all strings of B on A.",
        implemented: false,
      },
      {
        args: [String, String],
        result: [String],
        description: "Join all characters of B on A.",
        implemented: false,
      },
    ],
  },
  {
    key: "f",
    name: "filter",
    modes: [
      {
        args: [Command, List],
        result: [List],
        description: "Remove all strings from B for which the application of A results in an empty string.",
        implemented: false,
      },
      {
        args: [Command, String],
        result: [String],
        description: "Remove all characters from B for which the application of A result in an empty string.",
        implemented: false,
      },
    ],
  },
  {
    key: "a",
    name: "sortAscending",
    modes: [
      {
        args: [List],
        result: [List],
        description: "Sort all strings in A in ascending order.",
        implemented: false,
      },
      {
        args: [String],
        result: [String],
        description: "Sort all characters in A in ascending order.",
        implemented: false,
      },
    ],
  },
  {
    key: "d",
    name: "sortDescending",
    modes: [
      {
        args: [List],
        result: [List],
        description: "Sort all strings in A in descending order.",
        implemented: false,
      },
      {
        args: [String],
        result: [String],
        description: "Sort all characters in A in descending order.",
        implemented: false,
      },
    ],
  },
  {
    key: "\|",
    name: "insert",
    modes: [
      {
        args: [String, Int, String],
        result: [String],
        description: "Insert A at index B in C.",
        implemented: false,
      },
      {
        args: [Int, String, String],
        result: [String],
        description: "Inserts B after every Ath character in C.",
        implemented: false,
      },
      {
        args: [String, Int, List],
        result: [String],
        description: "Insert A at index B in C.",
        implemented: false,
      },
      {
        args: [Int, String, List],
        result: [String],
        description: "Inserts B after every Ath string in C.",
        implemented: false,
      },
    ],
  },
  {
    key: "%",
    name: "replace",
    modes: [
      {
        args: [String, String, String],
        result: [String],
        description: "Replace all non-overlapping occurences of B in C with A.",
        implemented: false,
      },
      {
        args: [String, Regex, String],
        result: [String],
        description: "Replace all non-overlapping matches of B in C with A.",
        implemented: false,
      },
    ],
  },
];
