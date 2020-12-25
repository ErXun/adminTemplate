import axios from 'axios';

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
