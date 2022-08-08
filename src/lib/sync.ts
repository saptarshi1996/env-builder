import fs from 'fs'

import parse from './parser'
import {
  ifFileExistsThenCreate
} from './file'

export const createInit = () => {
  ifFileExistsThenCreate('.env')
  ifFileExistsThenCreate('.env.example')
}

export const syncEnvExample = () => {
  ifFileExistsThenCreate('.env')

  // Remove the key values from .env.example so that they are not pushed to version control
  const fileData = fs.readFileSync('.env', 'utf-8')
  const keyValue = parse(fileData)

  ifFileExistsThenCreate('.env.example')

  const fileDataExample = fs.readFileSync('.env.example', 'utf-8')
  const keyValueExample = parse(fileDataExample)

  // update keys of .env with .env.example
  Object.keys(keyValueExample).forEach((key) => {
    keyValue[key] = keyValueExample[key]
  })

  console.log(keyValue)
  console.log(keyValueExample)
}

export const syncEnv = () => {
  ifFileExistsThenCreate('.env.example')

  // Remove the key values from .env so that they are not pushed to version control
  const fileData = fs.readFileSync('.env.example', 'utf-8')
  const keyValue = parse(fileData)

  ifFileExistsThenCreate('.env')

  const fileDataEnv = fs.readFileSync('.env', 'utf-8')
  const keyValueEnv = parse(fileDataEnv)

  Object.keys(keyValueEnv).forEach((key) => {
    keyValue[key] = keyValueEnv[key]
  })

  console.log(keyValue)
  console.log(keyValueEnv)
}
