import axios from 'axios';
import qs from 'qs'

/**
 * 根据环境变量区分接口默认地址
 */
switch (process.env.NODE_ENV) {
  case 'production':
    axios.defaults.baseURL = 'https://api.muxiaoguo.cn';
    break
  case 'test':
    axios.defaults.baseURL = 'http://localhost:8081/';
    break
  default:
    axios.defaults.baseURL = 'http://localhost:8080/'
}
/**
 * 设置超时时间和跨域是否携带凭证
 */
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true



/**
 * 设置请求传递数据的格式(看服务器要求什么格式)
 * x-www-form-urlencoded
 * xxx=1&yyy=2
 * qs库,用于url参数转化
 */
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = data => qs.stringify(data)

/**
 * 设置请求拦截器
 * 目的：TOKEN 检验(JWT)，  接受服务器返回的 TOKEN，存储到Vuex / 本地存储中，每次向服务器发送请求，都应该把 TOKEN 带上
 */
axios.interceptors.request.use(config => {
  // 携带 TOKEN
  let token = localStorage.getItem('token')
  token && (config.headers.Authorization = token)
  return config
}, error => {
  return Promise.reject(error)
})


/**
 * 设置响应拦截器
 */
axios.interceptors.response.use(response => {
  return response.data
}, error => {
  let { response } = error
  if (response) {
    // 服务器返回错误结果
    switch (response.status) {
      case 401: // 常用来表示没有权限(一般是用户未登录)
        break
      case 403: // 服务器拒绝执行(token 过期)
        break
      case 404: // not found
        break
    }
  } else {
    // 服务器连错误结果都没返回
    if (!window.navigator.onLine) {
      // 断网处理
      return
    }
    return Promise.reject(error)
  }
})

export default axios



















// axios 实例化
const request = axios.create({
  // baseURL: 'http://localhost:8081/',
  // baseURL: 'http://jsonplaceholder.typicode.com',
  timeout: 6000,
  headers: { 'X-Custom-Header': 'foobar' }
})

// request interceptors
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// response interceptors
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
})


function get({ url, param, responseType }) {
  return request({
    url: url,
    params: param,
    responseType: responseType,
    method: 'GET'
  })
}

const api = {
  get
}

export default api
