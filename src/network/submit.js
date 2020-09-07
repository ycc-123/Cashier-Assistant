import { requestPost } from './request'
import { store } from 'store/index'

export function _submitApi(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

export function _addressList() {
  return requestPost({
    params: {
      action: 'addressList'
    },
    data: {
      uniacid: store.getState().appConfig.uniacid,
      openid: store.getState().userInfoWX.openid
    }
  })
}