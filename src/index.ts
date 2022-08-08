#! /usr/bin/env node

import { program } from 'commander'

import {
  createInit,
  syncEnvExample,
  syncEnv,
} from './lib/file'

interface Program {
  command: string
  description: string
  action: () => void
}

const programList: Program[] = [
  {
    command: 'init',
    description: 'Initialize .env and .env.example files',
    action: createInit,
  },
  {
    command: 'sync-env',
    description: 'Sync .env file with .env.example',
    action: syncEnv,
  },
  {
    command: 'sync-ex',
    description: 'Synchronize .env.example file with .env',
    action: syncEnvExample,
  },
]

programList.forEach((programType: Program) => {
  program.command(programType.command)
    .action(programType.action)
    .description(programType.description)
})

program.parse()
