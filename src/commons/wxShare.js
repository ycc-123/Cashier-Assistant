import { store } from 'store/index'

import { _wxConfig } from "network/profile"

export async function setWXConfig(title, imgUrl, desc, link) {
  const wx = window.wx
  const { appConfig } = store.getState()
  console.log(appConfig, '拿uniacid')
  let wxConfig = {
    action: 'getjsapiticket',
    data: {
      uniacid: appConfig.uniacid,
      url: window.location.href
    }
  }
  // 获取结果
  let wxConfigRes = await _wxConfig(wxConfig)
  const { appId, timestamp, nonceStr, signature } = wxConfigRes.data.data

  wx.config({
    debug: false,
    appId,
    timestamp,
    nonceStr,
    signature,
    jsApiList: [
      'getLocation',
      'openLocation',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone'
    ]
  })


  wx.ready(function () {
    wx.checkJsApi({
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
      success: function (res) {
        // 以键值对的形式返回，可用的api值true，不可用为false
        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
      }
    })
    wx.onMenuShareTimeline({
      title,
      link,
      imgUrl,
      success: function () {
        console.log(imgUrl)
      },
      cancel: function () {
        console.log('用户取消分享')
      }
    })
    wx.onMenuShareAppMessage({
      title,
      desc,
      link,
      imgUrl,
      type: '',
      dataUrl: '',
      success: function () {
        console.log(imgUrl)
      },
      cancel: function () {
        console.log('用户取消分享')
      }
    })
  })

}