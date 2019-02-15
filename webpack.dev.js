/**
 * Copyright (c) 2014-2018 Zuoyebang, All rights reserved.
 * @fileoverview
 * @author zhangji02 | zhangji02@zuoyebang.com
 * @version 1.0 | 2019-01-22
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
// merge webpack configurations together
const merge = require('webpack-merge');
// load common config
const common = require('./webpack.common.js');

module.exports = merge(common, {
  // production, development, none
  mode: 'development',
  // this option controls if and how source maps are generated.
  devtool: 'inline-source-map',
  // develop server config
  devServer: {
    // host: '0.0.0.0',
    port: 9527,
    // open hot module replacement
    hot: true,
    // https: true,
    contentBase: './dist',
    compress: true,
    // shows a full-screen overlay in the browser when there are compiler errors or warnings
    overlay: {
      errors: true,
      warnings: false
    },
    historyApiFallback: {
      rewrites: [
        {from : /.*/, to: path.posix.join('/', 'index.html')}
      ]
    }
  },
  plugins: [
    // new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Development',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
});

