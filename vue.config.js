module.exports = {
  devServer: {
    // before: require('./src/mock/index.js
    proxy: {
      "/test": { //代理标识
        target: 'https://api.muxiaoguo.cn',//指向的实际地址
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          '^/test': ''
        }
      }
    },
    proxy: {
      "/express": { //代理标识
        target: 'http://localhost:8000/',//指向的实际地址
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          '^/express': ''
        }
      }
    }
  }
}
