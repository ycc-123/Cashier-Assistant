import { requestPost, } from './request'

export function WW(){
  return requestPost({
    
    data: {
      uniacid: "53"
    }
  })
}
