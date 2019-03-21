# Webpack 建立流程

## 參考連結

[webpack官方網站](https://webpack.js.org/)

## 安裝基本元件

安裝全域資源
```bash
sudo npm install -g webpack webpack-cli
```
> 使用 windows 需省略 sudo 指令

初始化 npm 專案
```bash
npm init -y
```
> 使用 -y 指令將自動跳過所有提問，快速初始化

安裝基本的相依套件
```bash
npm install --save-dev webpack webpack-cli
```

建立相關路徑及檔案

_**ROOT**_<br/>
  ∟&emsp;_**assets**_<br/>
    |&emsp;&emsp;∟&emsp;_**js**_<br/>
      |&emsp;&emsp;|&emsp;&emsp;∟&emsp;_index.js_&emsp;&emsp;&emsp;&emsp;程式進入點<br/>
    |&emsp;&emsp;∟&emsp;_**scss**_<br/>
      |&emsp;&emsp;|&emsp;&emsp;∟&emsp;_style.scss_&emsp;&emsp;&emsp;scss 根資源<br/>
    |&emsp;&emsp;∟&emsp;_**images**_&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; 圖檔目錄<br/>
  ∟&emsp;_**dist**_&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;打包資料輸出路徑，每次執行都會清空，請勿放置任何資源<br>
  ∟&emsp;_index.html_&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;html 範本<br>
  ∟&emsp;_webpack.config.js_&emsp;&emsp;&emsp;&emsp;webpack 設定檔<br>
  ∟&emsp;_package.json_&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;npm 設定檔

## webpack 設置

編輯 _**webpack.config.js**_
```javascript
const path = require('path')

module.exports = {
  mode: 'development',  // 'production' || 'development' || 'none'
  entry: {
    index: './assets/js/index.js'
  },
  output: {
    path: path.resolve('dist'),
    filename: 'js/[hash].bundle.js'
  }
}
```

使用 webpack-cli 進行編譯
```bash
webpack
```

編譯成功會看到下列提示

<img src="https://i.imgur.com/PzXzQSB.png" width="400">

## 加入 scss 至專案中

安裝相依套件
```bash
npm install --save-dev node-sass style-loader css-loader postcss-loader sass-loader autoprefixer
```

編輯 _**webpack.config.js**_ 加入 scss 規則
```javascript
const path = require('path')

module.exports = {
  mode: 'development',  // 'production' || 'development' || 'none'
  entry: {
    index: './assets/js/index.js'
  },
  output: {
    path: path.resolve('dist'),
    filename: 'js/[hash].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [require('autoprefixer')]
              }
            }
          },
          {loader: 'sass-loader}
        ]
      }
    ]
  }
}
```

##專案圖包處理

安裝相依套件
```bash
npm install --save-dev file-loader
```

編輯 _**webpack.config.js**_ 加入圖檔規則
```javascript
const path = require('path')

module.exports = {
  mode: 'development',  // 'production' || 'development' || 'none'
  entry: {
    index: './assets/js/index.js'
  },
  output: {
    path: path.resolve('dist'),
    filename: 'js/[hash].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [require('autoprefixer')]
              }
            }
          },
          {loader: 'sass-loader}
        ]
      },
      {
        test: /\.(jpe?g|png|gif|mp3|svg|ttf|eot)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][hash].[ext]',
              context: ''
            }
          }
        ]
      }
    ]
  }
}
```
> 本範例使用 [hash] 將檔案重新命名為隨機名稱，如要維持檔案名稱需改為 [name]

## 生成 index.html 檔案

編輯 _**index.html**_ 檔案
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>

</body>
</html>
```

安裝相依套件
```bash
npm install --save-dev html-loader html-webpack-plugin
```

編輯 _**webpack.config.js**_ 加入 html 生成器及相關規則
```javascript
const path = require('path')

module.exports = {
  mode: 'development',  // 'production' || 'development' || 'none'
  entry: {
    index: './assets/js/index.js'
  },
  output: {
    path: path.resolve('dist'),
    filename: 'js/[hash].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [require('autoprefixer')]
              }
            }
          },
          {loader: 'sass-loader}
        ]
      },
      {
        test: /\.(jpe?g|png|gif|mp3|svg|ttf|eot)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][hash].[ext]',
              context: ''
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html'
    })
  ]
}
```

## 其他設置

### 發布路徑清空

每次編譯前為了避免發布路徑遭到污染，必須須先清空路徑內容，以確保發布資源完整

安裝相依套件
```bash
npm install --save-dev clean-webpack-plugin
```

編輯 _**webpack.config.js**_ 加入套件
```javascript
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',  // 'production' || 'development' || 'none'
  entry: {
    index: './assets/js/index.js'
  },
  output: {
    path: path.resolve('dist'),
    filename: 'js/[hash].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [require('autoprefixer')]
              }
            }
          },
          {loader: 'sass-loader}
        ]
      },
      {
        test: /\.(jpe?g|png|gif|mp3|svg|ttf|eot)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][hash].[ext]',
              context: ''
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html'
    }),
    new CleanWebpackPlugin({
      verbose: true
    })
  ]
}
```
> 使用 verbose 模式，套件會將清除的項目條列出來在命令提示字元中

### 發布資源最小化

在正式發布版本時，資源需要最小化以降低伺服器負擔<br>
該方法在 webpack 原生資源中就有提供，只需要把方法加入設定檔即可

編輯 _**webpack.config.js**_ 加入套件
```javascript
const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',  // 'production' || 'development' || 'none'
  entry: {
    index: './assets/js/index.js'
  },
  output: {
    path: path.resolve('dist'),
    filename: 'js/[hash].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [require('autoprefixer')]
              }
            }
          },
          {loader: 'sass-loader}
        ]
      },
      {
        test: /\.(jpe?g|png|gif|mp3|svg|ttf|eot)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][hash].[ext]',
              context: ''
            }
          }
        ]
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
```