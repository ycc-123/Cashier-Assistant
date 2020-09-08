import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import TabBar from 'common/tabBar/TabBar'
import styled from 'styled-components'

class My extends Component {
  constructor(props){
    super(props)
    this.state={

    }
  }

  render() {
    return (
      <Fragment>
        <MyStyle>
        <div className='top'></div>
        <div className='conten'>
            <div className='Sales_volume' onClick={()=>{this.props.history.push('/SalesVolume')}}></div>
            <div className='two' onClick={()=>{this.props.history.push('/CategorySummary')}}></div>
            <div className='three' onClick={()=>{this.props.history.push('/timeManage')}}></div>
            <div className='four' onClick={()=>{this.props.history.push('/MemberBusiness')}}></div>
            <div className='five' onClick={()=>{this.props.history.push('/CollectionCompose')}}></div>
            <div className='six' onClick={()=>{this.props.history.push('/ShoppingGuide')}}></div>
            <div className='seven' onClick={()=>{this.props.history.push('/Hot')}}></div>
            <div className='eight' ></div>
            <div className='night' ></div>
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
.night{
  position:absolute;
  top:7rem;
  left:7rem;
  background-color:#f9f9f9;
  height:2.5rem;
  width:2.3rem;
}
.eight{
  position:absolute;
  top:7rem;
  left:4rem;
  background-color:#f9f9f9;
  height:2.5rem;
  width:2.3rem;
}
.seven{
  position:absolute;
  top:7rem;
  left:.7rem;
  background-color:transparent;
  height:2.5rem;
  width:2.3rem;
}
.six{
  position:absolute;
  top:3.5rem;
  left:7rem;
  background-color:transparent;
  height:2.5rem;
  width:2.3rem;
}
.five{
  position:absolute;
  top:3.5rem;
  left:4rem;
  background-color:transparent;
  height:2.5rem;
  width:2.3rem;
}
.four{
  position:absolute;
  top:3.5rem;
  left:.7rem;
  background-color:transparent;
  height:2.5rem;
  width:2.3rem;
}
.three{
  position:absolute;
  top:.5rem;
  left:7rem;
  background-color:transparent;
  height:2.5rem;
  width:2.3rem;
}
.two{
  position:absolute;
  top:.5rem;
  left:4rem;
  background-color:transparent;
  height:2.5rem;
  width:2.3rem;
}
.Sales_volume{
  position:absolute;
  top:.5rem;
  left:.7rem;
  background-color:transparent;
  height:2.5rem;
  width:2.3rem;
}
.top{
  
  height:1rem;
  width:100%;
  background-color:#f9f9f9;
}
.conten{
  position:relative;
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