import { requestPost, requestPostS } from './request'
import MD5 from 'js-md5'
import { store } from 'store/index'

let timestamp = new Date().getTime()
let sign = MD5('huodie2020' + timestamp)


export function _homeApi(config) {
  // config.data.timestamp = new Date().getTime()
  // config.data.sign = MD5('huodie2020' + config.data.timestamp)
  // config.data.timestamp = timestamp
  // config.data.sign = sign
  console.log(config)
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

// 获取首页轮播
export function _bannerApi() {
  console.log('123123')
  return requestPost({
    params: {
      action: 'banner'
    },
    data: {
      uniacid: store.getState().appConfig.uniacid
    }
  })
}

// 获取首页广告
export function _advsApi() {
  
  return requestPostS({
    params: {
      action: 'advs'
    },
    data: {
      uniacid: store.getState().appConfig.uniacid
    }
  })
}
// 获取首页商品魔方
export function _cubeApi() {
  return requestPostS({
    params: {
      action: 'cube'
    },
    data: {
      uniacid: store.getState().appConfig.uniacid
    }
  })
}

// 获取首页通告
export function _notesApi() {
  return requestPost({
    params: {
      action: 'notes'
    },
    data: {
      uniacid: store.getState().appConfig.uniacid,
    }
  })
}

// 获取首页报单
export function _singleApi() {
  return requestPost({
    params: {
      action: 'tips'
    },
    data: {
      uniacid: store.getState().appConfig.uniacid,
    }
  })
}



