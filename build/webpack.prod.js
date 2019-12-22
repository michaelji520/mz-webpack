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
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin'); // calculate operation time
// const smp = new SpeedMeasurePlugin();
// const Happypack = require('happypack');

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
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10, // priority
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    }
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
        use: 'babel-loader',
        // include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|bmp|webp|gif|tif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'image/[hash:8].[ext]' // use url-loader to turn small img to base64
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
        test: /\.(woff2?|ttf|eot|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
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
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true, // remove quotes of element attribute
        collapseWhitespace: true // remove white spaces
      }
    }),
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
    new AddAssetHtmlCdnWebpackPlugin(true, { // using this plugin would cause SpeedMeasurePlugin error, don't know why
      jquery: 'https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js',
    })
  ],
 });