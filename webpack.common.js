/**
 * Copyright (c) 2014-2018 Zuoyebang, All rights reserved.
 * @fileoverview
 * @author zhangji02 | zhangji02@zuoyebang.com
 * @version 1.0 | 2019-02-15
 */

// the path module provides utilities for working with file and directory paths
const path = require('path');
// generate default index.html
const HtmlWebpackPlugin = require('html-webpack-plugin');
// clean the /dist folder before each build
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  // string | object | array
  entry: {
    app: './src/index.js',
    another: './src/another.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Production',
      favicon: './assets/favicon.ico'
    })
  ],
  // Here the application start executing and webpack starts bundling
  output: {
    // string for solid filename
    // [name] for multi-module filename
    // [chunkhash]: hashes based on each chunks' content
    // [contenthash]: a unique hash based on the content of an asset
    filename: '[name].[chunkhash].js',
    // the target directory for all output files
    // must be an absolute path (using node.js path module)
    path: path.resolve(__dirname, 'dist'),
    //  determines the name of non-entry chunk files
    chunkFilename: '[id].[name].[chunkhash].js'
    // the url to the output directory resolved relative to the HTML page
    // publicPath: '/assets/'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimization: {
    splitChunks: {
      name: 'vendors',
      chunks: 'all'
    }
  }
};

