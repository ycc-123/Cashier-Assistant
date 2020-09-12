import { requestPost, } from './request'

// 获取门店
// export function get_store(){
//   return requestPost({
    
//     data: {
//       uniacid: "53"
//     }
//   })
// }

// 会员营业分析总人数
export function mb_TotalMember(){
  return requestPost({
    params: {
      action: 'mb_TotalMember'
    },
    data: {
      uniacid: "53"
    }
  })
}

export function get_store() {

  return requestPost({
    params: {
      action: 'get_store'
    },
    data: {
      uniacid: 53
    }
  })
}


// 会员储值
export function mb_StoredTotal() {

  return requestPost({
    params: {
      action: 'mb_StoredTotal'
    },
    data: {
      uniacid: 53
    }
  })
}

export function mb_StoredValueOverview(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}
export function mb_NewMember(config) {
  return requestPost({
    params: {
      action: config.action
    },
    data: config.data
  })
}

