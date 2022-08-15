import type { Analytics, Context, Plugin } from '@segment/analytics-next'
import { toFacade } from '@segment/analytics-next/dist/pkg/lib/to-facade.js'
import { normalize } from '@segment/analytics-next/dist/pkg/plugins/segmentio/normalize.js'

import { INTEGRATION_PAGE } from './constants'
import { log } from './log'

const ajxPrefix = /^ajs-next-/

/** VarianceDestination compatible with @segment/analytics-next */
export function VarianceDestination(
  analytics: Analytics,
  webhookUrl: string
): Plugin {
  async function send(ctx: Context) {
    if (!webhookUrl) return ctx

    let json = toFacade(ctx.event).json()
    if (typeof json.messageId === 'string') {
      json.messageId = json.messageId.replace(ajxPrefix, 'vjs-')
    }
    if (ctx.event.type === 'track') {
      delete json.traits
    }
    if (ctx.event.type === 'alias') {
      json = onAlias(analytics, json)
    }
    json.library = { name: 'variance-js', version: VERSION }

    const data = normalize(analytics, json)

    const response = await fetch(webhookUrl, {
      body: JSON.stringify(data),
      method: 'POST',
      mode: 'cors',
    })
    if (response.status === 401) {
      log(
        'error',
        `Please ensure that your Webhook URL and domain (${window.location.origin}) match your connection settings ${INTEGRATION_PAGE}`
      )
    }
    return ctx
  }

  return {
    alias: send,
    group: send,
    identify: send,
    isLoaded: () => true,
    load: async () => Promise.resolve(),
    name: 'Variance Destination',
    page: send,
    screen: send,
    track: send,
    type: 'destination',
    version: VERSION,
  }
}

type JSON = Record<string, unknown>
function onAlias(analytics: Analytics, json: JSON): JSON {
  const user = analytics.user()
  json.previousId =
    json.previousId ?? json.from ?? user.id() ?? user.anonymousId()
  json.userId = json.userId ?? json.to
  delete json.from
  delete json.to
  return json
}
