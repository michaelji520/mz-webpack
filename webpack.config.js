/**
 * Copyright (c) 2014-2018 Zuoyebang, All rights reserved.
 * @fileoverview
 * @author zhangji02 | zhangji02@zuoyebang.com
 * @version 1.0 | 2019-01-22
 */

const path = require('path');
// optimize css assets plugin
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// This plugin extracts CSS into separate files.
// It creates a CSS file per JS file which contains CSS.
// It supports On-Demand-Loading of CSS and SourceMaps.
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';
console.log(devMode);

module.exports = {
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  // production, development, none
  mode: 'production',
  // string | object | array
  entry: {
    app: './src/index.js'
  },
  // Here the application start executing and webpack starts bundling
  output: {
    // the target directory for all output files
    // must be an absolute path (using node.js path module)
    path: path.resolve(__dirname, 'dist'),
    // string for solid filename
    // [name] for multi-module filename
    // [chunkhash]: hashes based on each chunks' content
    // [contenthash]: a unique hash based on the content of an asset
    filename: '[name].js',
    // the url to the output directory resolved relative to the HTML page
    // publicPath: '/assets/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            // create style nodes from JS strings
            loader: MiniCssExtractPlugin.loader,
          },
          {
            // translates CSS into CommonJS
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};
