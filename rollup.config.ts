import replace from '@rollup/plugin-replace'
import typescript from '@rollup/plugin-typescript'
import type { RollupOptions } from 'rollup'

import { version } from './package.json'

function external(source: string, _importer: unknown, isResolved: boolean) {
  return !isResolved && !source.startsWith('.')
}

const replacePlugin = replace({
  preventAssignment: true,
  values: {
    VERSION: JSON.stringify(version),
  },
})

const config: RollupOptions = {
  external,
  input: ['src/index.ts', 'src/inject.ts'],
  output: [
    {
      dir: 'dist/esm',
      format: 'es',
      preserveModules: true,
      sourcemap: true,
      sourcemapExcludeSources: true,
    },
    {
      dir: 'dist/cjs',
      entryFileNames: '[name].cjs',
      format: 'cjs',
      sourcemap: true,
      sourcemapExcludeSources: true,
    },
  ],
  plugins: [replacePlugin, typescript()],
}
export default config
