const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');

module.exports = {
  mode: 'production',
  entry: ['vue', 'vue-router', 'vuex'],
  output: {
    filename: 'vue.dll.js',
    path: path.resolve(__dirname, '../dll'),
    library: 'vue', // 打包后接收自执行函数的名字`
  },
  plugins: [
    new DllPlugin({
      name: 'vue',
      path: path.resolve(__dirname, '../dll/manifest.json')
    })
  ]
};