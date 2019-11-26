const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const base = require('./webpack.base');

module.exports = merge(base, {
  mode: 'development',
  devServer: {
    port: 9527,
    compress: true, // active gzip compress
    contentBase: path.resolve(__dirname, '../dist'), // launch webpack service on `dist` directory
  },
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          'style-loader', 'css-loader', 'postcss-loader', 'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html'
    })
  ],
});

