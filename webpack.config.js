const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    // 虚拟打包路径，文件夹并不会正在生成，而是在8080端口虚拟生成
    publicPath: 'xuni',
    filename:'bundle.js'
  },
  devServer:{
    port:8080,
    contentBase:'www'
  }
};