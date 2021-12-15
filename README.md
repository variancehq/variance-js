# @variancehq/variance-js

Integrate Variance analytics into any web application. For more details please
visit [our docs](https://www.variance.com/docs/variance-js).

## Getting started

variance-js is a simple wrapper/plugin built off of the wonderful
[@segment/analytics-next](https://github.com/segmentio/analytics-next). If
you've used Segment in the past, this should feel very familiar.

```sh
# npm
npm install @variancehq/variance-js @segment/analytics-next

# yarn
yarn add @variancehq/variance-js @segment/analytics-next

#pnpm
pnpm add @variancehq/variance-js @segment/analytics-next
```

Before you continue, you'll need to generate `<YOUR_WEBHOOK_URL>` from
[https://app.variance.com/integrations](https://app.variance.com/integrations)
(note: you'll need a Variance account and admin privileges to view this page).

### React example

```tsx
import { VarianceJs } from '@variancehq/variance-js'
import { useEffect, useState, createContext, useContext } from 'react'

const VarianceContext = createContext<VarianceJs | undefined>(undefined)

function useVariance() {
  return useContext(VarianceContext)
}

export function App() {
  const [variance, setVariance] = useState<VarianceJs | undefined>(undefined)

  useEffect(() => {
    void VarianceJs.load('<YOUR_WEBHOOK_URL>').then(setVariance)
  }, [])

  return (
    <VarianceContext.Provider value={variance}>
      <TrackButton />
    </VarianceContext.Provider>
  )
}

function TrackButton() {
  return (
    <button onClick={() => useVariance()?.track('Hello world')}>Track</button>
  )
}
```
