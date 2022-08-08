import fs from 'fs'

import parse from './parser'

export const createInit = () => {
  if (!fs.existsSync('.env'))
    fs.openSync('.env', 'w')
  if (!fs.existsSync('.env.example'))
    fs.openSync('.env.example', 'w')
}

export const syncEnvExample = () => {
  if (!fs.existsSync('.env')) {
    console.log('.env not found. Created one for you')
    fs.openSync('.env', 'w')
    return
  }

  // Remove the key values from .env.example so that they are not pushed to version control
  const fileData = fs.readFileSync('.env', 'utf-8')
  const keyValue = parse(fileData)

  if (!fs.existsSync('.env.example')) {
    fs.openSync('.env.example', 'w')
  }

  const fileDataExample = fs.readFileSync('.env.example', 'utf-8')
  const keyValueExample = parse(fileDataExample)

  // update keys of .env with .env.example
  Object.keys(keyValueExample).forEach((key, value) => {
    keyValue[key] = value
  })

  console.log(keyValue)
  console.log(keyValueExample)
}

export const syncEnv = () => {
  if (!fs.existsSync('.env.example')) {
    console.log('.env.example not found. Created one for you')
    fs.openSync('.env.example', 'w')
    return
  }

  // Remove the key values from .env so that they are not pushed to version control
  const fileData = fs.readFileSync('.env.example', 'utf-8')
  const keyValue = parse(fileData)

  if (!fs.existsSync('.env')) {
    fs.openSync('.env', 'w')
  }

  const fileDataEnv = fs.readFileSync('.env', 'utf-8')
  const keyValueEnv = parse(fileDataEnv)

  Object.keys(keyValueEnv).forEach((key, value) => {
    keyValue[key] = value
  })

  console.log(keyValue)
  console.log(keyValueEnv)
}
