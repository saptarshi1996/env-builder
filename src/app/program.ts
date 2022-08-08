import { program } from 'commander'

import Program from '../interfaces/program'

import {
  createInit,
  syncEnvExample,
  syncEnv,
} from '../lib/sync'

export default function loadProgram () {
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
}
