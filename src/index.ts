#! /usr/bin/env node

import { program } from 'commander'

import fs from 'fs'

const createInit = () => {
  fs.openSync('.env', 'w')
  fs.openSync('.env.example', 'w')
}

const syncEnv = () => {
  if (!fs.existsSync('.env.example')) {
    console.log('.env.example not found. Created one for you')
    fs.openSync('.env.example', 'w')
    return
  }

  // Remove the key values from .env so that they are not pushed to version control
  const fileData = fs.readFileSync('.env.example', 'utf-8')
  const creds = fileData.split('\n').filter(data => data)
  const keyValue = creds.map((cred: string) => {
    const pair = cred.split('=')
    if (pair.length == 1) {
      return `${pair[0]}=`
    } else if (pair.length == 2) {
      return `${pair[0]}=${pair[1]}`
    } else {
      return null
    }
  }).filter(cred => cred)

  if (!fs.existsSync('.env')) {
    fs.openSync('.env', 'w')
  }

  const writeable = keyValue.join('\n')
  fs.appendFileSync('.env', writeable)
  fs.appendFileSync('.env', '\n')
}

const syncEnvExample = () => {
  if (!fs.existsSync('.env')) {
    console.log('.env not found. Created one for you')
    fs.openSync('.env', 'w')
    return
  }

  // Remove the key values from .env.example so that they are not pushed to version control
  const fileData = fs.readFileSync('.env', 'utf-8')
  const creds = fileData.split('\n').filter(data => data)
  const keyValue = creds.map((cred: string) => {
    const pair = cred.split('=')
    if (pair.length > 0) {
      return `${pair[0]}=`
    } else {
      return null
    }
  }).filter(cred => cred)

  if (!fs.existsSync('.env.example')) {
    fs.openSync('.env.example', 'w')
  }

  const writeable = keyValue.join('\n')
  fs.appendFileSync('.env.example', writeable)
  fs.appendFileSync('.env.example', '\n')
}

program.command('init')
  .description('Initialize .env and .env.example files')
  .action(createInit)

program.command('sync-env')
  .description('Sync .env file with .env.example')
  .action(syncEnv)

program.command('sync-ex')
  .description('Synchronize .env.example file with .env')
  .action(syncEnvExample)

program.parse()
