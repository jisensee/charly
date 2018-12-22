import { writeFileSync } from 'fs'
import { commands } from '../src/commands/_allCommands'
import { CItem } from '../src/types'

// tslint:disable:max-line-length
let fileContent = `
### Notes
* \`A\` refers to the item on top of the stack, \`B\` to the next one, etc. Every command has a fixed arity but might accept different combinations of types.
* With the exception of \`#\`, every command-object that gets applied to an item uses it's own stack which is initialized to the value of the item that it gets applied to. At the end of the execution of the command-object this stack gets joined into one string, just like the main stack of the program.
* Unless noted otherwise, all commands pop their arguments from the stack and leave the result.
* All command bindings here are not final yet. The basic commands will probably not get changed, but I will move lesser used commands to non-ASCII characters and use ASCII-characters for the most frequently used functions.

### Types
IPOS knows the following types:
* \`<str>\` -> String
* \`<int>\` -> Integer
* \`<cmd>\` -> Command
* \`<lst>\` -> List
* \`<rgx>\` -> Regex
* \`<itm>\` -> Item, any of  the ones above

Command | Arguments | Result | Description
:-----: | --------- | ------ | -----------`
function formatTypes(types: Array<new (a: any) => CItem>): string {
  const alpha = 'ABCDEFGHIJ'

  const r = types
    .map(
      (t, index) =>
        `${alpha[types.length - index - 1]}<${new t(null).typeName}>`,
    )
    .join(' ')
  return r.length === 0 ? ' ' : r
}

commands
  .sort((c1, c2) => c1.key.localeCompare(c2.key))
  .forEach(c => {
    c.modeList.forEach(mode => {
      const args = formatTypes(mode.args)
      const result = formatTypes(mode.results)
      const description = mode.description.replace(/ ([A-Z]) /g, ' `$1` ')

      fileContent += `\n\`${
        c.key
      }\` | \`${args}\` | \`${result}\` | ${description}`
    })
  })

writeFileSync('documentation/commands.md', fileContent)
