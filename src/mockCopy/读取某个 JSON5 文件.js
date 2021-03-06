//  读取某个 JSON5 文件
const fs = require('fs')
const path = require('path')
const JSON5 = require('json5')

var json = fs.readFileSync(path.join(
  __dirname, './userInfo.json5'
), 'utf-8')

var obj = JSON5.parse(json)

console.log(obj);
/**
 * { 'list|100':
   [ { id: '@id()',
       name: '@cname()',
       date: '@date()',
       ip: '@ip()',
       email: '@email()' } ],
  'newList|10': [ { id: '@id()', name: '@cname()' } ] }
 */
