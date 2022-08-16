/* eslint @typescript-eslint/no-explicit-any:"off", @typescript-eslint/no-unsafe-assignment:"off", @typescript-eslint/no-unsafe-member-access:"off",@typescript-eslint/no-unsafe-call:"off",@typescript-eslint/ban-ts-comment:"off" */
import { log } from './log'
import { VarianceJs } from './VarianceJs'

declare global {
  interface Window {
    variance: VarianceJs | VarianceJsStub
  }
}

const stubMethods = [
  'addDestinationMiddleware',
  'addIntegrationMiddleware',
  'addSourceMiddleware',
  'alias',
  'debug',
  'group',
  'identify',
  'off',
  'on',
  'once',
  'page',
  'pageview',
  'ready',
  'reset',
  'setAnonymousId',
  'track',
  'trackClick',
  'trackForm',
  'trackLink',
  'trackSubmit',
] as const

export type VarianceJsStub = Pick<VarianceJs, typeof stubMethods[number]> & {
  isStub: true
  load(webhookUrl: string): void
  invoked: boolean
}

const stubCalls: any[] = []
window.variance = {
  invoked: false,
  isStub: true,
  load(webhookUrl) {
    if (!window.variance.isStub || window.variance.invoked) {
      log('error', `loaded multiple times`)
      return
    }
    window.variance.invoked = true
    void VarianceJs.load(webhookUrl).then((instance) => {
      window.variance = instance
      while (stubCalls.length) {
        const [method, ...args] = stubCalls.shift()
        // @ts-ignore
        window.variance[method](...args)
      }
    })
  },
} as VarianceJsStub

stubMethods.forEach((method) => {
  window.variance[method] = function (...args: unknown[]) {
    if (window.variance.isStub && !window.variance.invoked) {
      log('error', 'window.variance.load(...) must be called first.')
    }
    stubCalls.push([method].concat(Array.prototype.slice.call(args)))
  } as any
})
