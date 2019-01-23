/**
 * Copyright (c) 2014-2018 Zuoyebang, All rights reserved.
 * @fileoverview
 * @author zhangji02 | zhangji02@zuoyebang.com
 * @version 1.0 | 2019-01-22
 */

const path = require('path');

module.exports = {
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
        test: /\.less$/,
        use: [
          {
            // create style nodes from JS strings
            loader: 'style-loader'
          },
          {
            // translates CSS into CommonJS
            loader: 'css-loader'
          },
          {
            // compile Less to CSS
            loader: 'less-loader'
          }
        ]
      }
    ]
  }
};
