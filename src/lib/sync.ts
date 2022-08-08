import fs from 'fs'

import parse from './parser'
import {
  clearFile,
  ifFileExistsThenCreate
} from './file'

export const createInit = () => {
  ifFileExistsThenCreate('.env')
  ifFileExistsThenCreate('.env.example')
}

export const syncEnvExample = () => {

  // Get data from .env file
  ifFileExistsThenCreate('.env')

  // Read .env file and make key value pairs.
  const fileDataEnv = fs.readFileSync('.env', 'utf-8')
  const keyValueEnv = parse(fileDataEnv)

  ifFileExistsThenCreate('.env.example')

  // Read .env.example and make key value pairs.
  const fileDataExample = fs.readFileSync('.env.example', 'utf-8')
  const keyValueExample = parse(fileDataExample)

  // For every key in .env update example but don't put value.
  Object.keys(keyValueEnv).forEach((key: string) => {
    if (!keyValueExample[key]) {
      keyValueExample[key] = ''
    }
  })

  clearFile('.env.example')
  Object.keys(keyValueExample).forEach((key: string) => {
    const keyValue = `${key}=\n`
    fs.appendFileSync('.env.example', keyValue)
  })
}

export const syncEnv = () => {

  // Get data from .env.example and update .env
  ifFileExistsThenCreate('.env.example')

  // Read .env.example and make key value pairs.
  const fileDataExample = fs.readFileSync('.env.example', 'utf-8')
  const keyValueExample = parse(fileDataExample)

  ifFileExistsThenCreate('.env')

  // Read .env and make key value pairs.
  const fileDataEnv = fs.readFileSync('.env', 'utf-8')
  const keyValueEnv = parse(fileDataEnv)

  // Every key present in .env.example has to be written to .env
  // Keys in .env should not be updated.
  Object.keys(keyValueExample).forEach((key: string) => {
    if (!keyValueEnv[key]) {
      keyValueEnv[key] = keyValueExample[key]
    }
  })

  clearFile('.env')
  Object.keys(keyValueEnv).forEach((key: string) => {
    const keyValue = `${key}=${keyValueEnv[key]}\n`
    fs.appendFileSync('.env', keyValue)
  })
}
