import * as fs from 'fs'
import * as path from 'path'
import * as prompts from 'prompts'

run()

async function run(): Promise<void> {
  const response = await prompts([
    {
      type: 'text',
      name: 'key',
      message: 'Command key',
    },
    {
      type: 'number',
      name: 'arity',
      message: 'Arity',
    },
  ])

  const key: string = response.key
  const arity: number = response.arity

  const folderName = (await prompts({
    initial: key,
    message: 'Folder name',
    name: 'folderName',
    type: 'text',
  })).folderName

  const cmdFolderPath = path.join('.', 'src', 'commands', folderName)
  fs.mkdirSync(cmdFolderPath)

  const cmdFilePath = path.join(cmdFolderPath, `${folderName}.ts`)
  const cmdFileContent = getCommandFileContent(key, folderName, arity)
  fs.writeFileSync(cmdFilePath, cmdFileContent)

  const indexFilePath = path.join(cmdFolderPath, 'index.ts')
  fs.writeFileSync(indexFilePath, getIndexFileContent(folderName))
}

function getCommandFileContent(
  key: string,
  folderName: string,
  arity: number,
): string {
  return `import { Command } from 'charly/command'
import { Stack } from 'charly/stack'
import { CItem } from 'charly/types'

const ${folderName}: Command = {
  key: '${key}',
  arity: ${arity},
  modes: [
    {
      name: '',
      description: '',
      args: [],
      results: [],
      execute(stack: Stack, A: CItem): void {},
    },
  ],
}
export { ${folderName} }
`
}

function getIndexFileContent(folderName: string): string {
  return `
import { ${folderName} } from './${folderName}'
export { ${folderName} }
`
}
