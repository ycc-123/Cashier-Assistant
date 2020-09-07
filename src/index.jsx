import React from 'react'
import ReactDOM from 'react-dom'

import { store, persistor } from 'store/index'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react';



import AppRouter from './router/AppRouter'

import 'lib-flexible'
import 'assets/css/border.css'
import 'assets/css/basic.css'




// if (regRes !== null) {
//   baseUrl = regRes[0]
//   storage.setItem("baseUrl", JSON.stringify(baseUrl))
// } else {
//   baseUrl = 'https://dev.huodiesoft.com/'
// }
// async function deCodeUinacid(txt) {
//   let uniRes = await axios.post(baseUrl + 'wechat_users_api.php?action=passport_decrypt', { txt })

//   // 解析的uniacid
//   uniacid = uniRes.data.data
//   //商户是否过期
//   let vipEnd = await axios.post(baseUrl + 'wechat_users_apis.php?action=vipEnd', { uniacid })
//   if (vipEnd.data.status === 200) {
//     let have = JSON.parse(window.localStorage.getItem('appConfig'))
//     console.log('检查商户的appconfig 中得 openid', have)
//     if (have) {
//       // 缓存中已经有了
//       // 不是第一次使用改 app 需要考虑已经存在其它的商户
//       // 检查这个商家是否是我缓存中已经存在的已授权的商家
//       let uniacObject = {}
//       let diffUniac = []
//       diffUniac = have
//       console.log(diffUniac, '缓存中的其它商家')
//       let notOldUniac = diffUniac.find(value => {
//         return value.uniacid === uniacid
//       })
//       console.log('结果不为undefined证明是已经存在的授权过的商家', notOldUniac)

//       if (notOldUniac === undefined) {
//         //添加新的商家并让他授权
//         if (code) {
//           uniacObject.uniacid = uniacid

//           getOpenidAsync(uniacid, code, mid, baseUrl, nocode).then(() => {
//             let WXuserInfo = JSON.parse(storage.getItem('WXuserInfo'))
//             uniacObject.wxUserInfo = WXuserInfo
//             const action = saveAppConfig(uniacObject) // 存新的商家
//             store.dispatch(action)
//             diffUniac.push(uniacObject)

//             let indexStoreStatus = [
//               { name: "WXuserInfo(当前用户)", fileExtension: WXuserInfo },
//               { name: "diffuniac(不同商家)", fileExtension: diffUniac },
//               { name: "uniacObject(新的商家)", fileExtension: uniacObject },
//             ];
//             console.table(indexStoreStatus)

//             storage.setItem('appConfig', JSON.stringify(diffUniac))
//             if (uniacObject.wxUserInfo.openid) {
//               /*if(mid !== null){
//                   getOpenidAsync(uniacid,code,mid).then( (res) => {
//                       console.log('mid返回',res)
//                   })
//               }*/

//               // url 中存在code,去除url 中的code 拼接
//               // nocode 代表是被处理的 url 不再重新走 授权函数
//               /* if(code){
//                    let Res = newBaseUrl.exec(url)
//                    storage.setItem('test',Res[0]+`?entry=${entry}&mid=${mid}?nocode='nocode'`)
//                    let redirectUrl = Res[0]+`?entry=${entry}&mid=${mid}`
//                    window.location.replace(redirectUrl)
//                }*/
//               ReactDOM.render(
//                 <Provider store={store}>
//                   <PersistGate persistor={persistor}>
//                     <AppRouter />
//                   </PersistGate>
//                 </Provider>, document.getElementById('root'))
//             }
//           })
//         } else {
//           console.log('本地有，新的商家授权')
//           getCodeUrlAsync(url, uniacid, baseUrl)
//         }
//       } else {
//         /* if(code){
//              let Res = newBaseUrl.exec(url)
//              storage.setItem('test',Res[0]+`?entry=${entry}&mid=${mid}`)
//          }*/
//         // 不需要授权直接渲染

//         // 切换缓存时将对应的 当前缓存 重新存到 redux
//         if (notOldUniac) {
//           const action = saveAppConfig(notOldUniac) // 替换redux 中的当前商家
//           store.dispatch(action)

//           ReactDOM.render(
//             <Provider store={store}>
//               <PersistGate persistor={persistor}>
//                 <AppRouter />
//               </PersistGate>
//             </Provider>, document.getElementById('root'))
//         }
//         console.log('不需要授权直接渲染', '但前缓存情况', diffUniac, notOldUniac)
//       }
//     } else {
//       // 没有
//       // 第一次使用 只考虑手机上只会有 一家商户
//       console.log('第一次使用 只考虑手机上只会有 一家商户=============')
//       let diffUniac = []
//       let uniacObject = {}
//       if (code) {
//         uniacObject.uniacid = uniacid
//         // 用code 和 当前的uniacid 得到 用户的信息
//         getOpenidAsync(uniacid, code, mid, baseUrl, nocode).then(() => {
//           let WXuserInfo = JSON.parse(window.localStorage.getItem('WXuserInfo'))
//           uniacObject.wxUserInfo = WXuserInfo
//           const action = saveAppConfig(uniacObject)
//           store.dispatch(action)
//           diffUniac.push(uniacObject)

//           let indexStoreStatus = [
//             { name: "WXuserInfo(当前用户new)", fileExtension: WXuserInfo },
//             { name: "diffuniac(不同商家new)", fileExtension: diffUniac },
//             { name: "uniacObject(新的商家new)", fileExtension: uniacObject },
//           ];
//           console.table(indexStoreStatus)

//           window.localStorage.setItem('appConfig', JSON.stringify(diffUniac))
//           if (uniacObject.wxUserInfo.openid) {

//             /* if(mid !== null){
//                  getOpenidAsync(uniacid,code,mid).then( (res) => {
//                      console.log(res)
//                  })
//              }*/

//             // nocode 代表是被处理的 url 不再重新走 授权函数
//             /* if(code){
//                  let Res = newBaseUrl.exec(url)
//                  storage.setItem('test',Res[0]+`?entry=${entry}&mid=${mid}?nocode='nocode'`)
//                  let redirectUrl = Res[0]+`?entry=${entry}&mid=${mid}`
//                  window.location.replace(redirectUrl)
//              }*/


//             ReactDOM.render(
//               <Provider store={store}>
//                 <PersistGate persistor={persistor}>
//                   <AppRouter />
//                 </PersistGate>
//               </Provider>, document.getElementById('root'))
//           }
//         })
//       } else {
//         // 将当前的url 传到到后台 ，跳转获取code
//         getCodeUrlAsync(url, uniacid, baseUrl)
//       }
//     }
//   } else {
//     // 该店铺倒闭了
//     ReactDOM.render(<Closed />, document.getElementById('root'))
//   }
// }
// deCodeUinacid(uniacid)

//********************************************************* 测试站


ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>, document.getElementById('root'))

