const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',  // 'production' || 'development' || 'none'
  entry: {
    index: './assets/js/index'
  },
  output: {
    path: path.resolve('dist/'),
    filename: 'assets/js/[hash].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                require('autoprefixer')
              }
            }
          },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][hash].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html'
    })
  ]
}