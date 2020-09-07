import { store } from 'store/index'
import MD5 from 'js-md5'
import { requestPost } from './request'

let timestamp = new Date().getTime()
let sign = MD5('huodie2020' + timestamp)

export function _cartApi(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}


export function _showCart() {
  return requestPost({
    params: {
      action: 'cartView'
    },
    data: {
      uniacid: store.getState().appConfig.uniacid,
      openid: store.getState().userInfoWX.openid,
      timestamp,
      sign
    }
  })
}


/* export function editCartGoods(op, uniacid, id, gid, num, ccid) {
  return request({
    params: {
      op,
      uniacid,
      id,
      gid,
      num,
      ccid
    }
  })
} */