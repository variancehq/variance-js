import { INTEGRATION_PAGE } from './constants'
import { log } from './log'

export function validateOpts(value: unknown): value is string {
  if (typeof value === 'string' && value.length) return true
  log(
    'error',
    `Webhook URL missing. You can generate one by visiting ${INTEGRATION_PAGE}`
  )
  return false
}
