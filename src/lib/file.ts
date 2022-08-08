import * as fs from 'fs'

export const compareEnv = ({
  env,
  example,
}: Record<string, unknown>) => {
  console.log(env)
  console.log(example)
}

export const comapreEnvExample = ({
  env,
  example,
}: Record<string, unknown>) => {
  console.log(env)
  console.log(example)
}

export const ifFileExistsThenCreate = (path: string) => {
  if (!fs.existsSync(path)) {
    fs.openSync(path, 'w')
  }
}

export const clearFile = (path: string) => fs.writeFileSync(path, '')
