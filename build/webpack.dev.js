const path = require('path');
const merge = require('webpack-merge');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.base');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(base, {
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, '../src/main.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].js',
    publicPath: '/',
    chunkFilename: 'js/[name].js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  optimization: {
    usedExports: true // turn tree shaking in development mode
  },
  devServer: {
    port: 9527,
    hot: true,
    compress: true, // active gzip compress
    contentBase: path.resolve(__dirname, '../dist'), // launch webpack service on `dist` directory
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
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
        test: /\.(jpe?g|png|bmp|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'image/[contenthash].[ext]',
            limit: 5 * 1024
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
          'style-loader', 'css-loader', 'postcss-loader', 'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(), // 当开启 HMR 的时候使用该插件会显示模块的相对路径，
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html'
    }),
    new DllReferencePlugin({
      manifest: path.resolve(__dirname,'../dll/manifest.json')
    }),
    new AddAssetHtmlWebpackPlugin({ // NOTE: This plugin requires html-webpack-plugin@^2.10.0.
      filepath: path.resolve(__dirname, '../dll/vue.dll.js')
    }),
  ],
});

