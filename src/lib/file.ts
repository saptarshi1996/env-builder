import * as fs from 'fs'

export const ifFileExistsThenCreate = (path: string) => {
  if (!fs.existsSync(path)) {
    fs.openSync(path, 'w')
  }
}

export const clearFile = (path: string) => fs.writeFileSync(path, '')
