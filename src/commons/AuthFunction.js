import { saveUserInfo } from 'store/actionCreators'
import { store } from 'store/index'
import axios from "axios";
let { openid } = store.getState().appConfig.wxUserInfo

async function getOpenidAsync(uniacid, code, mid,baseUrl,nocode) {

    if(nocode === 'nocode'){
        console.log('code 已经删除')
    }else{
        let Storage = window.localStorage
        openid = openid ? openid : ''
        let result = await  axios.post(baseUrl+'wechat_users_apis.php?action=getWXInfo',{uniacid,code,openid})
        if (result.data.data.openid) {
            let userinfo = result.data.data
            mid = mid ? mid : ''
    
            let openids = userinfo.openid
    
            let member = await axios.post(baseUrl+'wechat_users_apis.php?action=getMember',{openids})
            console.log(member)
            let memberDetail = await axios.post(baseUrl+'wechat_users_apis.php?action=getMemberDetails',{uniacid,mid,openids})
            userinfo.id = memberDetail.data.data.id
           
                Storage.setItem('WXuserInfo', JSON.stringify(userinfo))
                const action = saveUserInfo(userinfo)
                store.dispatch(action)
            
        }
    }
   
}


async function getCodeUrlAsync(url, uniacid,baseUrl) {
    axios.post(baseUrl+'wechat_users_apis.php?action=getWXCode',{uniacid,url}).then(res => {
        if (res.data.data) {
            window.location.href = res.data.data
        }
    })
}




const getQueryString = (name) => {
    // 获取URL中的code
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        // console.log('code===', unescape(r[2]))
        return unescape(r[2]);
    }
    return null;
}

const getQueryEntry = (entry) => {
    // 获取URL中的code
    var reg = new RegExp('(^|&)' + entry + '==([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        console.log('code===', unescape(r[2]))
        return unescape(r[2]);
    }
    return null;
}


export {
    getQueryString,
    getQueryEntry,
    getOpenidAsync,
    getCodeUrlAsync,
}