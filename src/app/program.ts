import { program } from 'commander'

import { getPrograms } from '../lib/constant'
import Program from '../interfaces/program'

export default function loadProgram () {

  const programList = getPrograms()
  programList.forEach((programType: Program) => {
    program.command(programType.command)
      .action(programType.action)
      .description(programType.description)
  })

  program.parse()
}
