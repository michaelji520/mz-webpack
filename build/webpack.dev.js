const path = require('path');
const merge = require('webpack-merge');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.base');

module.exports = merge(base, {
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, '../src/main.js')
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../dist')
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
    compress: true, // active gzip compress
    contentBase: path.resolve(__dirname, '../dist'), // launch webpack service on `dist` directory
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
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html'
    })
  ],
});

