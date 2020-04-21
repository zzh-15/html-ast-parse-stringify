const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    main: './index.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: "babel-loader"
      }]
    }]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: 'htmlParse', // 规定了组件库返回值的名字,可以script标签引入
    libraryTarget: 'umd', // 返回值的编码格式 
    globalObject: 'this'
  }
}