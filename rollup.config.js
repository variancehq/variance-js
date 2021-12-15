import typescript from '@rollup/plugin-typescript'
import replace from '@rollup/plugin-replace'
import { version } from './package.json'

function external(source, _importer, isResolved) {
  return !isResolved && !source.startsWith('.')
}

const replacePlugin = replace({
  preventAssignment: true,
  values: {
    VERSION: JSON.stringify(version),
  },
})

const input = ['src/index.ts']

module.exports = [
  {
    input,
    external,
    output: {
      dir: 'dist',
      format: 'es',
      preserveModules: true,
      sourcemap: true,
      sourcemapExcludeSources: true,
    },
    plugins: [
      replacePlugin,
      typescript({
        declaration: true,
        outDir: 'dist',
      }),
    ],
  },
]
