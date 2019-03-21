const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')


module.exports = {
  mode: 'development',
  entry: {
    index: './assets/js/index.js'
  },
  output: {
    path: path.resolve('dist'),
    filename: 'assets/js/[hash].bundle.js'
  },
  module: {
    rules: [{
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [require('autoprefixer')]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|mp3|svg|ttf|eot)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][hash].[ext]',
            context: ''
          }
        }]
      }
    ]
  },
  plugins: [
    /*
    | 如果執行環境是 Production, 那麼就將程式 minimize
    */
    new webpack.LoaderOptionsPlugin({
      minimize: false
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html'
    }),
    new CleanWebpackPlugin({
      verbose: true
    })
  ]
}