
import { requestPost } from './request'
import { store } from 'store/index'

export function _api(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

export function _decoding(data) {
  console.log(data)
  return requestPost({
    data
  })
}

export function _storeApi() {
  return requestPost({
    params:{
        action: 'getAllStore'
    },
    data:{
      uniacid: store.getState().appConfig.uniacid
    }
  })
}