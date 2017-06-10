const webpack = require('webpack')
const { resolve } = require('path')
const nodeExternals = require('webpack-node-externals')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  entry: './index',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'server.js',
    publicPath: '/',
    // エントリポイントの戻りを module.exports の形で提供する
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
      },
      {
        test: /\.css$/,
        use: 'raw-loader',
      },
    ]
  },
  target: 'node',
  // 全モジュール bundle せずに環境から呼び出す
  externals: [nodeExternals()],
  plugins: isProduction ? [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ] : [],
  node: {
    // Node.js サーバー以外で動かす予定はない
    console: false,
    global: false,
    process: false,
    __filename: false,
    __dirname: false,
    Buffer: false,
    setImmediate: false,
  }
}