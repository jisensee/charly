import { lstatSync, readdirSync } from 'fs'
import * as path from 'path'
import { Command } from './command'

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
    const cmd: Command = require(`./${cmdDirName}`)[cmdDirName]
    return cmd
  } catch (e) {
    return {
      key: '',
      arity: 0,
      modes: [],
    }
  }
}
