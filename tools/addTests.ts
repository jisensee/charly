import { writeFileSync } from 'fs'
import * as path from 'path'
import { Command } from '../src/command'
import { CItem } from '../src/types'

if (process.argv.length < 3) {
  throw new Error('No command folder name given!')
}

const cmdFolderName = process.argv[2]

const cmdModulePath = `../src/commands/${cmdFolderName}`
// tslint:disable-next-line: no-var-requires
const command: Command = require(cmdModulePath)[cmdFolderName]

const testFileName = `${cmdFolderName}.spec.ts`
const testFilePath = path.join(
  '.',
  'src',
  'commands',
  cmdFolderName,
  testFileName,
)
writeFileSync(testFilePath, getTestFileContent(command))

function getTestFileContent(cmd: Command): string {
  const modes = cmd.modes.map(mode => mode.name).join('/')
  const modeTests = getModeTests(cmd)

  return `import { describe, it } from 'mocha'
import { ensure } from 'charly/testHelper'

// tslint:disable:no-unused-expression

describe('${cmd.key} - ${modes}', () => {
${modeTests}
})
`
}

function getModeTests(cmd: Command): string {
  return cmd.modes
    .map(mode => {
      const args = formatTypes(mode.args)
      const results = formatTypes(mode.results)
      const itStr = `${args} => ${results}`
      return `  it('${itStr}', () => {\n    \n  })`
    })
    .join('\n\n')
}

function formatTypes(types: Array<new (a: any) => CItem>): string {
  const typeList = types.map(type => new type('').typeName).join(',')
  return `[${typeList}]`
}
