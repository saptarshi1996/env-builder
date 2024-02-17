import { program } from 'commander'

import { getPrograms } from '../config/constant'

export default function loadProgram () {

  const programList = getPrograms()

  for (const programType of programList) {
    program.command(programType.command)
      .action(programType.action)
      .description(programType.description)
  }

  program.option('-en, --encode', 'URL').parse(process.argv)
}
