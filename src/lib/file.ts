import * as fs from 'fs'

export const ifFileExistsThenCreate = (path: string) => {
  if (!fs.existsSync(path)) {
    fs.openSync(path, 'w')
  }
}

export const ifFileExists = (path: string) => {
  if (!fs.existsSync(path)) {
    throw new Error('.Env file not found')
  }
}

export const clearFile = (path: string) => fs.writeFileSync(path, '')
