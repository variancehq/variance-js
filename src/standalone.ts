/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { log } from './log'
import { validateOpts } from './validateOpts'
import { VarianceJs } from './VarianceJs'

async function load() {
  const stubs = window.variance
  if (!Array.isArray(stubs)) {
    log('error', 'Snippet was not property loaded')
    return
  }

  const loadStub = stubs.shift()
  if (!loadStub || loadStub[0] !== 'load') {
    log('error', 'Variance.load must be called before first')
    return
  }

  if (validateOpts(loadStub[1])) {
    window.variance = await VarianceJs.load(loadStub[1])
  }

  stubs.forEach((stub) => {
    const [method, ...args] = stub
    // @ts-ignore
    window.variance[method](...args)
  })
}
void load()
