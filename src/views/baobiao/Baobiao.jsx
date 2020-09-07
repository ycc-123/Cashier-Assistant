import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import styled from 'styled-components'
import TabBar from 'common/tabBar/TabBar'

class Baobiao extends Component {

  render() {
    document.title = '收银数据助手'
    return (
      <Fragment>
        <BaobiaoStyle>
          <div className='top'></div>
          <div className='conten'>
            <img src={require('assets/img/zhongxin.png')} alt="" />
          </div>
          <div className='footer'></div>
          <TabBar />
        </BaobiaoStyle>
      </Fragment>
    )
  }
}
const BaobiaoStyle = styled.div`
.top{
  border:none;
  height:1rem;
  width:100%;
  background-color:#2e5bff;
}
.conten{
  border:none;
  height:15rem;
}
.conten img{
  height:100%;
  width:100%;
}
.footer{
  height:1rem;
  width:100%;
  background-color:#f9f9f9;
}

`

export default withRouter(Baobiao)