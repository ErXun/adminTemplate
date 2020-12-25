module.exports = {
  devServer: {
    before: require('./src/mock/index.js'),
    // proxy: 'https://cdn.ycku.com'
    proxy: 'https://api.muxiaoguo.cn'  // 跨域代理
  }
}

