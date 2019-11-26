const path = require('path');

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/index.js')
  },
  module: {
    // loaders follow the sequence of bottom-to-top, right-to-left
    rules: [
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
      }
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', {
      //     loader: 'css-loader',
      //     options: {
      //       importLoaders: 2
      //     }
      //   }, 'postcss-loader', 'less-loader']
      // },
      // {
      //   test: /\.less$/,
      //   use: ['style-loader', 'css-loader', 'less-loader']
      // }
    ]
  },
  plugins: [

  ],
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  }
};

