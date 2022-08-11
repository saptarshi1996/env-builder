import Program from '../interfaces/program'
import {
  createInit,
  syncEnvExample,
  syncEnv,
  base64EncodeEnv,
} from './sync'

export const getLine = () => /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg

export const getPrograms = (): Program[] => [
  {
    command: 'init',
    description: 'Initialize .env and .env.example files',
    action: createInit,
  },
  {
    command: 'sync-env',
    description: 'Update .env using .env.example',
    action: syncEnv,
  },
  {
    command: 'sync-ex',
    description: 'Update .env.example using .env',
    action: syncEnvExample,
  },
  {
    command: 'base64-env',
    description: 'Encode .env to base64',
    action: base64EncodeEnv,
  },
]
