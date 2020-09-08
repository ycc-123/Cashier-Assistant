import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


import TabBar from 'common/tabBar/TabBar'
import styled from 'styled-components'
import {  DatePicker, List } from "antd-mobile";



import './style/home.css'



class Home extends Component {
  constructor(){
    super()
    this.state={
      date:''
    }
  }
  render() {



    return (
      <HomeStyle>
        <div>
          <div className='header'>
            <span className='right-img'>
              <img src="https://res.lexiangpingou.cn/images/826/2020/04/zZWiIZSwf62zisqkp7s7ij6ipypwri.png" alt="" />
            </span>
            <div className='h_conten'>
              <div className='h_one_img'><img src="https://res.lexiangpingou.cn/images/826/2020/04/fGWhsQ01gNNNESUH55S95Z0aUUHGH1.png" alt="" /></div>
              <div className='h_wen'>全部门店</div>
              <div className='h_two_img'><img src="https://res.lexiangpingou.cn/images/826/2020/04/zltxzLUIITsQVlXv7AUV2XUVtXII4M.png" alt="" /></div>
            </div>
            <span className='left-img'>
              <img src="https://res.lexiangpingou.cn/images/826/2020/04/QahvVu2Bs6zPy6t6Ufb82ABa2PuNXh.png" alt="" />
            </span>
          </div>
            <div style={{width:"7rem",height:"1rem"}}>
            <DatePicker
              className='aaa'
              mode="date"
              extra="2019-09-14"
              onOk={console.log()}
              value={this.state.date}
              onChange={date => this.setState({
                date,
              })}
            >
              <List.Item onClick={this.time} className='time' name="birthDay" arrow="horizontal" ></List.Item>
            </DatePicker>
            </div>
            
         

          <div className='conten'>

            <div >
              <div className='kuaione'></div>
              <ul className='kuaitwo'>
                <li className='jione'></li>
                <li className='jitwo'></li>
              </ul>
            </div>

          </div>
          <div className='footer'>

          </div>

          <TabBar />
        </div>
      </HomeStyle>
    )
  }
}

const HomeStyle = styled.div`
.kuaione{
  margin:0 auto;
  width:100%;
  height:1rem;
  background-color:red;
  box-shadow: 0px 0px 20px #000;
}
.am-list-arrow am-list-arrow-horizontal{
  width:3rem;
}
.am-list-item .am-list-line .am-list-extra{
  padding-top:.1rem;
  color:#000;
  text-align: left;
  font-size:.4rem;
  padding-left:.1rem;
}
.am-list-item time am-list-item-middle{
  width:1rem;
}
.am-list-item{
  padding-left:0;
}

.am-list-item .am-list-line .am-list-arrow{
  background-image: none;
  opacity:0;
}
.time{
  color: #fff;
  background-color: transparent;
}
.am-list-arrow am-list-arrow-horizontal{
  background-image: none;
  opacity:0;
}

.h_two_img img{
  width: 100%;
  height:100%;
}
.h_two_img{
  margin-left:.3rem;
  width: .15rem;
  height:.15rem;
}
.h_wen{
  font-size:.4rem;
  margin-left:.2rem;
}
.h_one_img img{
  width:100%;
  height:100%;
}
.h_one_img{
  margin-top:.2rem;
  width:.5rem;
  height:.5rem;

}
.h_conten{
  width:33.3%;
  display:flex;
  height:1rem;
  line-height:1rem;
}
.right-img{
  width:33.3%;
  padding-top:.1rem;
}
.right-img img{
  padding-left:.2rem;
  height:.75rem;
}
.left-img{
  width:33.3%;
  padding-top:.2rem;
}
.left-img img{
  padding-left:2.3rem;
  height:.6rem;
}
.header{
  display:flex;
  height:1rem;
  width:100%;
  background-color:#fff;
}

`

export default withRouter(Home)