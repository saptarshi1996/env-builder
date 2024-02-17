import Program from '../interfaces/program'
import {
  createInit,
  syncEnvExample,
  syncEnv,
  base64EncodeEnv,
} from '../lib/action'

export const getLine = () => /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg

export const getPrograms = (): Program[] => [
  {
    command: 'init',
    description: 'Initialize .env and .env.example files',
    action: createInit,
  },
  {
    command: 'env',
    description: 'Copy from .env.example to .env',
    action: syncEnv,
  },
  {
    command: 'example',
    description: 'Copy from .env to .env.example',
    action: syncEnvExample,
  },
  {
    command: 'base64',
    description: 'Encode .env to base64',
    action: base64EncodeEnv,
  },
]
