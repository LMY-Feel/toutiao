/// / 配置一个符合项目需要的axios，导出去进行全局配置
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import JSONBIG from 'json-bigint'

// 自定义转换响应内容
axios.defaults.transformResponse = [(data) => {
  // data 原始数据     有一些接口没有响应内容  data === null 报错
  try {
    return JSONBIG.parse(data)
  } catch (e) {
    return data
  }
}]
// 基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 请求头  token
// axios.defaults.headers.Authorization = `Bearer ${store.getUser().token}`

/// / 请求拦截器（在每一次请求前）
// use 里函数在每次请求前会调用
// 第一个函数：拦截请求成功调用
// 第二个函数：拦截请求的时候，做业务的时候，出现报错，才会触发第二个函数的执行。
axios.interceptors.request.use(config => {
  // 参数 config 请求配置  默认配置
  // 修改配置  添加 token 信息
  // 返回修改好的配置  请求的时候使用你的修改后的配置
  config.headers.Authorization = `Bearer ${store.getUser().token}`
  return config
}, (err) => {
  // error 错误对象
  // 对请求错误做些什么
  // 返回一个一定出错的promise对象
  // new Promise((resolve,reject)=>{})  可能成功可能失败
  // Promise.reject(error) 一定是调catch() 失败
  // Promise.resolve() 一定是调then() 成功
  return Promise.reject(err)
})

// res => { return res } ==== res => res
axios.interceptors.response.use(res => res, err => {
  // 自己逻辑
  // 1. 获取状态码
  const status = err.response.status
  // 2. 判断401
  if (status === 401) {
    // 3. 清除无效token
    store.delUser()
    // 4. 跳转登录
    // 4.1 原生方式改路径  router基于hash实现  /login ===> #/login
    // window.location.hash = '#/login'
    // 4.2 使用router进行跳转  $router本质 main.js导入了router/index.js的实例 挂载vue根实例下。
    router.push('/login')
  }
  return Promise.reject(err)
})

export default axios
