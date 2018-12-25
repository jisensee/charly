import { Command } from 'charly/command'
import { lstatSync, readdirSync } from 'fs'
import * as path from 'path'

export function getAllCommands(): Command[] {
  const cmdDir = path.join('./src/commands')

  const isDirectory = (objName: string) => {
    const dirName = path.join(cmdDir, objName)
    return lstatSync(dirName).isDirectory()
  }
  const dirNames = readdirSync(cmdDir)

  return dirNames.filter(isDirectory).map(getCommand)
}

function getCommand(cmdDirName: string): Command {
  try {
    const mod = `./${cmdDirName}`
    const cmd: Command = require(mod)[cmdDirName]
    return cmd
  } catch (e) {
    return {
      key: '',
      arity: 0,
      modes: [],
    }
  }
}

const allCommands = getAllCommands()

export { Command, allCommands }
