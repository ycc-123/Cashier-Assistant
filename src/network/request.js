import axios from 'axios'

export function requestPost(config) {
  const instance = axios.create({
    timeout: 10000,
    // 测试站
    baseURL: 'https://dev.huodiesoft.com/posdataapi.php?action=get_store',
    // 正式站
    // baseURL: 'https://www.lexiangpingou.cn/wechat_api.php',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: config.data
  })
  instance.interceptors.request.use(config => {
    console.log(config)
    return config
  }, err => {
    console.log(err)
    return Promise.reject(err)
  })
  // 2.axios的拦截器
  // 2.1请求拦截器的作用
  instance.interceptors.response.use(config => {
    return config
  }, err => {
    console.log(err)
    return Promise.reject(err)
  })
  return instance(config)
}
