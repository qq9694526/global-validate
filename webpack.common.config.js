'use strict';
const path = require('path'),
  UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
  nodeExternals = require('webpack-node-externals'),
  config = require('./config');

module.exports = {
  mode: 'production',
  context: path.resolve(__dirname),
  devtool: false,
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'dist/'),
    // 「入口分块(entry chunk)」的文件名模板（出口分块？）
    filename: config.commonFileName,
    // 通用模块定义
    libraryTarget: 'commonjs2',
    // 输出解析文件的目录，url 相对于 HTML 页面
    // publicPath: './dist',
    // 导出库(exported library)的名称
    library: config.library,
    // 在 UMD 库中使用命名的 AMD 模块
    umdNamedDefine: true
  },
  externals: [
    nodeExternals()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        warnings: false,
        compress: {}
      },
      sourceMap: false,
      parallel: true
    })
  ]
};
