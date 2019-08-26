// 负责：用户信息的 储存 获取 删除 三个函数
const KEY = 'toutiao'
export default {
  setUser (user) {
    // 存储
    const jsonStr = JSON.stringify(user)
    window.sessionStorage.setItem(KEY, jsonStr)
  },
  getUser () {
    // 获取
    const jsonStr = window.sessionStorage.getItem(KEY) || '{}'
    return JSON.parse(jsonStr)
  },
  delUser () {
    // 删除
    window.sessionStorage.removeItem(KEY)
  }
}
