// 引入 Mock
const Mock = require('mockjs')


// 按照一定的要求，随机生成数据
// let obj = Mock.mock({
//   id: '@id()',  // 随机 id
//   name: '@cname()', // 随机姓名
//   date: '@date()',
//   ip: '@ip()',
//   email: '@email()',
// })


let newObj = Mock.mock({
  'list|5': [{
    id: '@id()',  // 随机 id
    name: '@cname()', // 随机姓名
    date: '@date()',
    ip: '@ip()',
    email: '@email()',
  }]
})

console.log(newObj);
