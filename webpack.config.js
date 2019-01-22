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

  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
