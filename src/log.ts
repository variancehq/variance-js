/* eslint-disable no-restricted-globals */

export function log(fn: 'error', message: string) {
  console[fn](`variance-js: ${message}`)
}
