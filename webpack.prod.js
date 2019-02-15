/**
 * Copyright (c) 2014-2018 Zuoyebang, All rights reserved.
 * @fileoverview
 * @author zhangji02 | zhangji02@zuoyebang.com
 * @version 1.0 | 2019-01-22
 */

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// This plugin extracts CSS into separate files.
// It creates a CSS file per JS file which contains CSS.
// It supports On-Demand-Loading of CSS and SourceMaps.
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// optimize css assets plugin
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        // set true if you want JS source maps
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  }
});
