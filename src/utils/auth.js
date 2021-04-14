import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 获取当前用户所具有的权限
export function getCurrentAuthority() {
  // return ['user']
  return ['admin']
}

// 校验
export function check(authority) {
  const current = getCurrentAuthority()
  return current.some(item => authority.includes(item))
}

// 登录校验
export function isLogin() {
  const current = getCurrentAuthority()
  return current && current[0] !== 'guest'
}
