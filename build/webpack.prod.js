const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // clean auto generated files before build
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin'); // remove unused class
const glob = require('glob');

const base = require('./webpack.base');

 module.exports = merge(base, {
  mode: 'production',
  entry: {
    app: path.resolve(__dirname, '../src/main.js')
  },
  output: {
    filename: 'app.[contenthash].js',
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.(jpe?g|png|bmp|gif|tif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'image/[contenthash].[ext]' // use url-loader to turn small img to base64
          }
        }
      },
      {
        test: /\.(woff|ttf|eot|)$/,
        use: 'file-loader'
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader', 'postcss-loader', 'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css'
    }),
    new PurgecssWebpackPlugin({
      paths: glob.sync(`${path.join(__dirname, '../src')}/**/*`,  { nodir: true }) // process files only
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dist')]
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true, // remove quotes of element attribute
        collapseWhitespace: true // remove white spaces
      }
    }),
  ],
 });