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
const AddAssetHtmlCdnWebpackPlugin = require('add-asset-html-cdn-webpack-plugin');
// const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin'); // calculate operation time
// const smw = new SpeedMeasureWebpackPlugin();

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
  externals: { // ignored libraries, load from cdn, doesn't pack
    jquery: '$'
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
    ],
    splitChunks: {
      chunks: 'async', // split async modules
      minSize: 30000, // split chunk when module > 30k
      maxSize: 0,
      minChunks: 1, // refernence times
      maxAsyncRequests: 6, // max number of async request
      maxInitialRequests: 4, // max number of initial request
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      cacheGroups: {
        vendors: { // split third-party modules first
          test: /[\\/]node_modules[\\/]/,
          priority: -10 // priority
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
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
        test: /\.(jpe?g|png|bmp|webp|gif|tif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'image/[contenthash].[ext]' // use url-loader to turn small img to base64
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ]
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
    new AddAssetHtmlCdnWebpackPlugin(true, {
      jquery: 'https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js',
    })
  ],
 });