/**
 * Copyright (c) 2014-2018 Zuoyebang, All rights reserved.
 * @fileoverview
 * @author zhangji02 | zhangji02@zuoyebang.com
 * @version 1.0 | 2019-01-22
 */

const path = require('path');
// generate default index.html
const HtmlWebpackPlugin = require('html-webpack-plugin');

// clean the /dist folder before each build
const CleanWebpackPlugin = require('clean-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  // production, development, none
  mode: 'development',
  // string | object | array
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    // host: '0.0.0.0',
    port: 9527,
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
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      favicon: './assets/favicon.ico',
      title: 'Development',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ],
  // Here the application start executing and webpack starts bundling
  output: {
    // the target directory for all output files
    // must be an absolute path (using node.js path module)
    path: path.resolve(__dirname, 'dist'),
    // string for solid filename
    // [name] for multi-module filename
    // [chunkhash]: hashes based on each chunks' content
    // [contenthash]: a unique hash based on the content of an asset
    filename: '[name].bundle.js',
    // the url to the output directory resolved relative to the HTML page
    // publicPath: '/assets/'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
};
