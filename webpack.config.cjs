const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const { version } = require('./package.json')

const plugins = [
  new webpack.DefinePlugin({
    VERSION: JSON.stringify(version),
  }),
]
const base = {
  mode: 'production',
  resolve: { extensions: ['.ts', '.js'] },
}

module.exports = [
  {
    ...base,
    entry: path.resolve(__dirname, 'src/standalone.ts'),
    output: {
      chunkFilename: '[name].[contenthash].js',
      filename: 'variancejs.min.js',
      path: path.resolve(__dirname, 'build'),
      publicPath: '/v1',
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'ts-loader',
              options: { transpileOnly: true },
            },
          ],
        },
      ],
    },
    plugins: [...plugins, new CleanWebpackPlugin()],
  },
  {
    entry: path.resolve(__dirname, 'snippet.html'),
    mode: 'production',
    output: {
      assetModuleFilename: 'snippet.min.html',
      filename: 'tmp/snippet.html.js', // throw away webpack's generated entry
      path: __dirname,
    },
    optimization: {
      minimize: true,
      minimizer: [`...`, new HtmlMinimizerPlugin()],
    },
    module: {
      rules: [{ test: /\.html$/, type: 'asset/resource' }],
    },
  },
]
