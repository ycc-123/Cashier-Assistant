import axios from 'axios'
// import { store } from 'store/index'
import MD5 from 'js-md5'

// 重新请求的次数,请求的间隙
export function request(config) {
  // let loading
  // 1.创建axios的实例
  const instance = axios.create({
    // 测试站
    baseURL: 'https://dev.huodiesoft.com/posdataapi.php',
    // 正式站

    timeout: 1000
  })
  // 2.axios的拦截器
  // 2.1请求拦截器的作用
  instance.interceptors.response.use(config => {
    return config
  }, err => {
    return Promise.reject(err)
  })

  // 2.2响应拦截器
  instance.interceptors.response.use(res => {
  
    return res.data
  }, async err => {
    let config = err.config;
    // 设置一个变量用来跟踪重试次数 判断变量是否存在,不存在为0
    config.retryCount = config.retryCount || 0;

    // 判断重试的次数是否大于最大值,大于最大值发送错误消息
    if (config.retryCount >= 5) {
      return Promise.reject(err);
    }
    // 自增重试次数
    config.retryCount += 1;
    // 创建一个新的promis对象 在定时过后发送一个解决函数 收到解决函数才能then
    console.log(config.retryCount)
    var backoff = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });

    // backoff能进入then,在一秒之后发送一个一样新的网络请求
    return await backoff.then(() => {
      return instance(config)
    })
  })

  // 3.发送真正的网络请求,返回Promise
  return instance(config)
}

// 直播旧接口
export function requestLive(config) {
  let baseUrl = JSON.parse(window.localStorage.getItem('baseUrl')) || 'https://dev.huodiesoft.com/'
  if (baseUrl !== null) {
    const instance = axios.create({
      // 测试站
      baseURL: baseUrl !== 'https://dev.huodiesoft.com/' ? 'https://a6.lexiangpingou.cn/applet/live.php' : baseUrl + 'applet/live.php',
      timeout: 1000
    })

    return instance(config)
  }

}

// post带s的 瑞怀接口
export function requestPostS(config) {
  console.log(JSON.parse(window.localStorage.getItem('baseUrl')))
  let baseUrl = JSON.parse(window.localStorage.getItem('baseUrl')) || 'https://dev.huodiesoft.com/'
  if (baseUrl !== null) {

    const instance = axios.create({
      timeout: 10000,
      // 测试站
      baseURL: baseUrl + 'wechat_users_apis.php',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
    })
    instance.interceptors.request.use(async config => {
      const token = JSON.parse(sessionStorage.getItem('token'))
      if (token !== null) {
        config.headers['token'] = token
        return config
      } else {
      
        return config
      }

    }, err => {
      console.log(err)
      return Promise.reject(err)
    })
    return instance(config)
  }
}

// 不带s  新曼接口
export function requestPost(config) {

  let baseUrl = JSON.parse(window.localStorage.getItem('baseUrl')) || 'https://dev.huodiesoft.com/'

  if (baseUrl !== null) {
    config.data.timestamp = new Date().getTime()
    config.data.sign = MD5('huodie2020' + config.data.timestamp)
    const instance = axios.create({
      timeout: 10000,
      // 测试站
      baseURL: baseUrl + 'posdataapi.php',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: config.data
    })

    instance.interceptors.request.use(async config => {
      const token = JSON.parse(sessionStorage.getItem('token'))
      if (token !== null) {
        config.headers['token'] = token
        return config
      } else {
        console.log('进来了')
      
        return config
      }

    }, err => {
      console.log(err)
      return Promise.reject(err)
    })

    instance.interceptors.response.use(config => {
      console.log(config.data.status)
      console.log(parseInt(config.data.status))

     
      return config

    }, err => {
      console.log(err)
      return Promise.reject(err)
    })
    return instance(config)
  }
}
