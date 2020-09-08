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
            <div className='touxiang'></div>
            <div className='nicheng'></div>
            <div className='wentifengyi'></div>
            <div className='youhua'></div>
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
.youhua{
  position:absolute;
  background-color:transparent;
  width:100%;
  height:1rem;
  top:7rem;
}
.wentifengyi{
  position:absolute;
  background-color:transparent;
  width:100%;
  height:1rem;
  top:5.8rem;
}
.nicheng{
  position:absolute;
  background-color:transparent;
  width:4rem;
  height:.6rem;
  left:3rem;
  top:4rem;
  text-align:center;
}
.touxiang{
  // border:2px solid #fff;
  position:absolute;
  left:3.8rem;
  top:1.5rem;
  width:2.2rem;
  height:2.2rem;
  border-radius:50%;
  background-color:transparent;
}
.top{
  border:none;
  height:1rem;
  width:100%;
  background-color:#2e5bff;
}
.conten{
  position:relative;
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