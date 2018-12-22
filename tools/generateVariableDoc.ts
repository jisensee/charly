import { writeFileSync } from 'fs'
import { variables } from '../src/variables'

// tslint:disable:no-trailing-whitespace
let fileContent = `# Variables

Charly has a set of preinitialized variables.
It is also possible to define custom variables with the \`=\` command.
Variable names can only be one character long and defining custom variables 
overrides the default meaning of the chosen character.  
Variables can be of any type, including Commands.
The latter allows to save a set of commands in a variable to use it multiple
times.

Name | Type | Value | Remark
:--: | ---- | ----- | ------`
// tslint:enable:no-trailing-whitespace

variables
  .sort((a, b) => a.name.localeCompare(b.name))
  .forEach(variable => {
    const nameCol = `\`${variable.name}\``
    const typeCol = `\`<${variable.value.typeName}>\``
    const value = variable.value.toString()
    const valueCol = `\`${value.length === 0 ? ' ' : value}\``
    const remarkCol = variable.remark || ''
    const row = [nameCol, typeCol, valueCol, remarkCol].join(' | ')
    fileContent += `\n| ${row} |`
  })

writeFileSync('documentation/variables.md', fileContent)
