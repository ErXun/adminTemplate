const fs = require('fs')
const path = require('path')
const Mock = require('mockjs')
const JSON5 = require('json5')

// 读取指定 JSON 文件
function getJsonFile(filePath) {
  let json = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8');
  return JSON5.parse(json);
}

// 返回一个函数
module.exports = function (app) {
  if (process.env.Mock == 'true') {
    // 监听 http 请求
    app.get('/user/userInfo', function (req, res) {
      // 每次响应请求时，读取 mock  data 的 json 文件
      // getJsonFile 方法用来读取 json 文件并解析数据对象
      let json = getJsonFile('./userInfo.json5')
      // 将 json 传入Mock.mock 方法中，生成的数据返回浏览器
      res.json(Mock.mock(json))
    })
  }

}
