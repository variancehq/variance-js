export function validateOpts(value: unknown): value is string {
  if (typeof value === 'string' && value.length) return true
  console.error(
    'variance-js webhookUrl missing. You can generate one by visiting https://app.variance.com/integrations'
  )
  return false
}
