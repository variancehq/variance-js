import type { Plugin } from '@segment/analytics-next'
import { Analytics, Group, User } from '@segment/analytics-next'
import { pageEnrichment } from '@segment/analytics-next/dist/pkg/plugins/page-enrichment/index.js'
import { validation } from '@segment/analytics-next/dist/pkg/plugins/validation/index.js'

import { validateOpts } from './validateOpts'
import { VarianceDestination } from './VarianceDestination'

export class VarianceJs extends Analytics {
  constructor() {
    const user = new User({
      cookie: { key: 'vjs_user_id', oldKey: '' },
      localStorage: { key: 'vjs_user_traits' },
      persist: true,
    })
    ;(user as unknown as { anonKey: string }).anonKey = 'vjs_anonymous_id'

    const group = new Group({
      cookie: { key: 'vjs_group_id' },
      localStorage: { key: 'vjs_group_properties' },
      persist: true,
    })

    super({ writeKey: '' }, undefined, undefined, user, group)

    return this
  }

  static async load(webhookUrl: string) {
    validateOpts(webhookUrl)
    const variance = new VarianceJs()
    await variance.register(
      validation,
      pageEnrichment as Plugin,
      VarianceDestination(variance, webhookUrl)
    )
    variance.initialized = true
    return variance
  }
}
