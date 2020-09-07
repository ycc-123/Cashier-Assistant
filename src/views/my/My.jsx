import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import TabBar from 'common/tabBar/TabBar'
import styled from 'styled-components'

class My extends Component {

  render() {
    return (
      <Fragment>
        <MyStyle>
        <div className='top'></div>
        <div className='conten'>
          <img src={require('assets/img/shujubaobiao.png')} alt=""/>
        </div>
        <div className='footer'></div>
        <TabBar />
        </MyStyle>
      </Fragment>
    )
  }

}
const MyStyle = styled.div`
.top{
  
  height:1rem;
  width:100%;
  background-color:#f9f9f9;
}
.conten{
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
export default withRouter(My)