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
