import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { List, Picker, DatePicker } from 'antd-mobile'
import { get_store, get_time ,pos_data_total,pos_data_profit,pos_data_order,pos_data_customer,pos_data_member} from 'network/Api'

import './style/home.css'
import TabBar from 'common/tabBar/TabBar'
import styled from 'styled-components'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      bgcolor: "",
      date_month: [],
      key: "",
      value: null,
      date: '',
      store: [],
      data: [],
      storeId: [],
      start: '',
      start_data: '',
      end: '',
      end_data: '',
      time: '',
      jkend: '',
      jkstart: '',
      ptstart:'',
      ptend:'',
      today_time: '',
      zhongsoul:'',
      total_pay_details:[],
      total_profit_rate:'',
      total_profit:'',
      total_order_num:'',
      total_customer_price:'',
      total_customer_num:'',
      member_pay_price:'',
      member_recharge:'',
      member_customer_price:''
    }
  }
  // 普通时间转格林时间方法
  StrToGMT(time) {
    let GMT = new Date(time)
    return GMT
  }
  // 选中事件
  active(e, index) {
    // 门店ID
    let w = JSON.stringify(this.state.storeId)
    let id = w.substring(2, 4)
    let time = ''
    if (index === 0) {
      time = "昨天"
    } else if (index === 1) {
      time = "今天"
    } else if (index === 2) {
      time = "近七天"
    } else if (index === 3) {
      time = "本月"
    }

    get_time({ action: 'get_time', data: { date: time } }).then(res => {
      pos_data_total({ action: 'pos_data_total', data: { end:res.data.data.end,start: res.data.data.start,store_id: id,uniacid: "53" } }).then(res=>{
        this.setState({
          zhongsoul: res.data.data.total_pay,
          total_pay_details:res.data.data.total_pay_details
        })
      })
      pos_data_profit({ action: 'pos_data_profit', data: { end:res.data.data.end,start: res.data.data.start,store_id: id,uniacid: "53" } }).then(res=>{
        if(res.data.data===undefined){

        }else{
          this.setState({
            total_profit:res.data.data.total_profit.now,
            total_profit_rate:res.data.data.total_profit_rate.now
          })
        }
        
      })
      pos_data_order({ action: 'pos_data_order', data: { end:res.data.data.end,start: res.data.data.start,store_id: id,uniacid: "53" } }).then(res=>{
        this.setState({
          total_order_num:res.data.data.total_order_num,
        })
      })
      pos_data_customer({ action: 'pos_data_customer', data: { end:res.data.data.end,start: res.data.data.start,store_id: id,uniacid: "53" } }).then(res=>{
        this.setState({
          total_customer_price:res.data.data.total_customer_price,
          total_customer_num:res.data.data.total_customer_num,
        })
      })
      pos_data_member({ action: 'pos_data_member', data: { end:res.data.data.end,start: res.data.data.start,store_id: id,uniacid: "53" } }).then(res=>{
        this.setState({
          member_pay_price:res.data.data.member_pay_price,
          member_customer_price:res.data.data.member_customer_price,
          member_recharge:res.data.data.member_recharge
        })
      })


      this.setState({
        ptstart:res.data.data.start,
        ptend:res.data.data.end
      })
      
      let start = this.StrToGMT(res.data.data.start)
      let end = this.StrToGMT(res.data.data.end)
      this.setState({
        start: start,
        end: end
      })
    })
    
    // pos_data_total({ action: 'pos_data_total', data: { end:this.state.ptend,start: this.state.ptstart,store_id: id,uniacid: "53" } }).then(res=>{
    //   this.setState({
    //     zhongsoul: res.data.data.total_pay,
    //     total_pay_details:res.data.data.total_pay_details
    //   })
    // })
    // pos_data_profit({ action: 'pos_data_profit', data: { end:this.state.ptend,start: this.state.ptstart,store_id: id,uniacid: "53" } }).then(res=>{
    //   this.setState({
    //     total_profit:res.data.data.total_profit.now,
    //     total_profit_rate:res.data.data.total_profit_rate.now
    //   })
    // })
    // pos_data_order({ action: 'pos_data_order', data: { end:this.state.ptend,start: this.state.ptstart,store_id: id,uniacid: "53" } }).then(res=>{
    //   console.log(res)
    //   this.setState({
    //     total_order_num:res.data.data.total_order_num,
    //   })
    // })
    // pos_data_customer({ action: 'pos_data_order', data: { end:this.state.ptend,start: this.state.ptstart,store_id: id,uniacid: "53" } }).then(res=>{
    // })
    
    
    
    this.setState({
      bgcolor: "#2e5bff",
      color: "#fff",
      key: index
    })
  }
  componentDidMount() {
    var day2 = new Date();
    day2.setTime(day2.getTime());
    var s2 = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();
    this.setState({
      today_time: s2
    })
    // 门店ID
    let w = JSON.stringify(this.state.storeId)
    let id = w.substring(2, 4)
    get_time({ action: 'get_time', data: { date: "今天" } }).then(res => {
      pos_data_total({ action: 'pos_data_total', data: { end:res.data.data.end,start: res.data.data.start,store_id: id,uniacid: "53" } }).then(res=>{
        this.setState({
          zhongsoul: res.data.data.total_pay,
          total_pay_details:res.data.data.total_pay_details
        })
      })
      pos_data_profit({ action: 'pos_data_profit', data: { end:res.data.data.end,start: res.data.data.start,store_id: id,uniacid: "53" } }).then(res=>{
        if(res.data.data===undefined){

        }else{
          this.setState({
            total_profit:res.data.data.total_profit.now,
            total_profit_rate:res.data.data.total_profit_rate.now
          })
        }
        
      })
      pos_data_order({ action: 'pos_data_order', data: { end:res.data.data.end,start: res.data.data.start,store_id: id,uniacid: "53" } }).then(res=>{
        this.setState({
          total_order_num:res.data.data.total_order_num,
        })
      })
      pos_data_customer({ action: 'pos_data_customer', data: { end:res.data.data.end,start: res.data.data.start,store_id: id,uniacid: "53" } }).then(res=>{
        this.setState({
          total_customer_price:res.data.data.total_customer_price,
          total_customer_num:res.data.data.total_customer_num,
        })
      })
      pos_data_member({ action: 'pos_data_member', data: { end:res.data.data.end,start: res.data.data.start,store_id: id,uniacid: "53" } }).then(res=>{
        this.setState({
          member_pay_price:res.data.data.member_pay_price,
          member_customer_price:res.data.data.member_customer_price,
          member_recharge:res.data.data.member_recharge
        })
      })


      this.setState({
        ptstart:res.data.data.start,
        ptend:res.data.data.end
      })
      
      let start = this.StrToGMT(res.data.data.start)
      let end = this.StrToGMT(res.data.data.end)
      this.setState({
        start: start,
        end: end
      })
    })
    
    
    get_store().then(res => {
      var result = res.data.data.map(o => { return { value: o.id, label: o.name } });
      let bb = [{ value: '', label: "全部门店" }]
      this.setState({
        data: [...bb, ...result]
      })
    })

    this.setState({
      date_month: ["昨天", "今天", "近七天", "本月"],
      key: 1
    })
  }
  justStore(data){
    let w = JSON.stringify(data)
    let id = w.substring(2, 4)
    get_time({ action: 'get_time', data: { date: "今天" } }).then(res => {
      pos_data_total({ action: 'pos_data_total', data: { end:res.data.data.end,start: res.data.data.start,store_id: id,uniacid: "53" } }).then(res=>{
        this.setState({
          zhongsoul: res.data.data.total_pay,
          total_pay_details:res.data.data.total_pay_details
        })
      })
      pos_data_profit({ action: 'pos_data_profit', data: { end:res.data.data.end,start: res.data.data.start,store_id: id,uniacid: "53" } }).then(res=>{
        if(res.data.data===undefined){

        }else{
          this.setState({
            total_profit:res.data.data.total_profit.now,
            total_profit_rate:res.data.data.total_profit_rate.now
          })
        }
        
      })
      pos_data_order({ action: 'pos_data_order', data: { end:res.data.data.end,start: res.data.data.start,store_id: id,uniacid: "53" } }).then(res=>{
        this.setState({
          total_order_num:res.data.data.total_order_num,
        })
      })
      pos_data_customer({ action: 'pos_data_customer', data: { end:res.data.data.end,start: res.data.data.start,store_id: id,uniacid: "53" } }).then(res=>{
        this.setState({
          total_customer_price:res.data.data.total_customer_price,
          total_customer_num:res.data.data.total_customer_num,
        })
      })
      pos_data_member({ action: 'pos_data_member', data: { end:res.data.data.end,start: res.data.data.start,store_id: id,uniacid: "53" } }).then(res=>{
        this.setState({
          member_pay_price:res.data.data.member_pay_price,
          member_customer_price:res.data.data.member_customer_price,
          member_recharge:res.data.data.member_recharge
        })
      })


      this.setState({
        ptstart:res.data.data.start,
        ptend:res.data.data.end
      })
      
      let start = this.StrToGMT(res.data.data.start)
      let end = this.StrToGMT(res.data.data.end)
      this.setState({
        start: start,
        end: end
      })
    })
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
              <div>&nbsp;</div>
              <div className='h_one_img'><img src="https://res.lexiangpingou.cn/images/826/2020/04/fGWhsQ01gNNNESUH55S95Z0aUUHGH1.png" alt="" /></div>
              <div className='h_wen' style={{ color: "#fff" }}>全部门店</div>
              <div className='h_two_img'><img src="https://res.lexiangpingou.cn/images/826/2020/04/zltxzLUIITsQVlXv7AUV2XUVtXII4M.png" alt="" /></div>
            </div>


            <span className='left-img'>
              <img src="https://res.lexiangpingou.cn/images/826/2020/04/QahvVu2Bs6zPy6t6Ufb82ABa2PuNXh.png" alt="" />
            </span>
          </div>
          <div>
            <Picker
              extra="全部门店"
              value={this.state.storeId}
              onOk={(data)=>{this.justStore(data)}}
              onChange={data => this.setState({ storeId: data })}
              data={this.state.data} cols={1} className="forss">
              <List.Item
                arrow="horizontal"
                className='time'
                style={{ width: "2.3rem", backgroundColor: "transparent", position: "absolute", top: "-.07rem", left: "3.6rem" }}
              ></List.Item>
            </Picker>
          </div>
          <div style={{ display: "flex" }}>
            <div className='start'>
              <DatePicker
                mode="date"
                title=""
                extra={this.state.today_time}
                onOk={''}
                value={this.state.start}
                onChange={start => this.setState({ start, start_data: start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate() })}
              >
                <List.Item arrow="horizontal" className='data'></List.Item>
              </DatePicker>
            </div>
            <span style={{ fontSize: ".5rem", paddingTop: ".5rem" }}>&nbsp;~</span>
            <div className='end'>
              <DatePicker
                mode="date"
                title=""
                extra={this.state.today_time}
                onOk={''}
                value={this.state.end}
                onChange={end => this.setState({ end, end_data: end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate() })}
              >
                <List.Item arrow="horizontal" className='data'></List.Item>
              </DatePicker>
            </div>
          </div>

          <div className='conten'>
            <ul className='date_month'>
              {
                this.state.date_month.map((v, index) => {
                  return (
                    <li onClick={(e) => this.active(e, index)} key={v}
                      style={{ backgroundColor: this.state.key === index ? this.state.bgcolor : '', color: this.state.key === index ? this.state.color : "" }}>{v}</li>
                  )
                })
              }
            </ul>
          </div>

          <div className='homeb'>
            <img src={require('assets/img/3.png')} alt="" />
            <img src={require('assets/img/4.png')} alt="" />
            <img src={require('assets/img/5.png')} alt="" />
            <img src={require('assets/img/6.png')} alt="" />
            <div className='q_right_one'>{this.state.zhongsoul.now}</div>
            <div className='q_left_one'>{this.state.zhongsoul.before}===={this.state.zhongsoul.compare}</div>
            <div className='q_right_two'>{this.state.total_order_num.before}===={this.state.total_order_num.compare}</div>
            <div className='q_left_two'>{this.state.total_order_num.now}</div>
            <div className='q_right_three'>{this.state.member_pay_price.before}===={this.state.member_pay_price.compare}</div>
            <div className='q_left_three'>{this.state.member_pay_price.now}</div>

            <div className='maolier'>{this.state.total_profit_rate}</div>
            <div className='maolilu'>{this.state.total_profit}</div>
            <div className='kedanliang'>{this.state.total_customer_num.now}</div>
            <div className='kedanjia'>{this.state.total_customer_price.now}</div>
            <div className='chongzhi'>{this.state.member_recharge.now}</div>
            <div className='huiyuan'>{this.state.member_customer_price.now}</div>

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
.huiyuan{
  position:absolute;
  top:12.05rem;
  left:6.5rem;
  width:2rem;
  height:.7rem;
  line-height:.7rem;
  background-color:transparent;
}
.chongzhi{
  position:absolute;
  top:12.05rem;
  left:1.75rem;
  width:2rem;
  height:.7rem;
  line-height:.7rem;
  background-color:transparent;
}
.kedanjia{
  position:absolute;
  top:7.85rem;
  left:6.5rem;
  width:2rem;
  height:.7rem;
  line-height:.7rem;
  background-color:transparent;
}
.kedanliang{
  position:absolute;
  top:7.85rem;
  left:1.75rem;
  width:2rem;
  height:.7rem;
  line-height:.7rem;
  background-color:transparent;
}
.maolilu{
  position:absolute;
  top:3.45rem;
  left:1.75rem;
  width:2rem;
  height:.7rem;
  line-height:.7rem;
  background-color:transparent;
}
.maolier{
  position:absolute;
  top:3.45rem;
  left:6.5rem;
  width:2rem;
  height:.7rem;
  line-height:.7rem;
  background-color:transparent;
}
.q_left_three{
  position:absolute;
  top:9.45rem;
  left:6.5rem;
  width:2rem;
  height:1rem;
  line-height:1rem;
  text-align:center;
  background-color:transparent;
}
.q_right_three{
  position:absolute;
  top:10.05rem;
  left:.65rem;
  width:3rem;
  height:.5rem;
  line-height:.5rem;
  background-color:transparent;
}
.q_left_two{
  position:absolute;
  top:5.1rem;
  left:6.5rem;
  width:2rem;
  height:1rem;
  line-height:1rem;
  text-align:center;
  background-color:transparent;
}
.q_right_two{
  position:absolute;
  top:5.8rem;
  left:.65rem;
  width:3rem;
  height:.5rem;
  line-height:.5rem;
  background-color:transparent;
}
.q_left_one{
  position:absolute;
  top:1.45rem;
  left:.65rem;
  width:3rem;
  height:.5rem;
  line-height:.5rem;
  background-color:transparent;
}
.q_right_one{
  position:absolute;
  top:.8rem;
  left:6.5rem;
  width:2rem;
  height:1rem;
  line-height:1rem;
  text-align:center;
  background-color:transparent;
}
.homeb{
  position:relative;

}
.homeb img{
  
  width:100%;
  height:100%;
}

.start{
    margin-left:2rem;
}

.data{
    background-color:#f9f9f9;
    padding:0;
    margin:0;
    width:2.5rem;
}
.am-list-item time am-list-item-middle{
    width:12rem;
}
.am-list-item .am-list-line .am-list-extra{
    position:absolute;
    right:.1rem;
    color:#474747;
    text-align: left;
    font-size:.4rem;
    padding-left:.1rem;
}
.am-list-item .am-list-line .am-list-arrow{

    background-image: none;
    opacity:0;
}

.am-list-arrow am-list-arrow-horizontal{
    background-image: none;
    opacity:0;
}
.date_month{
    display:flex;
    justify-content: space-around;
}
.date_month li{
    width: 2rem;
    height: .6rem;
    line-height: .6rem;
    text-align:center;
    background: #d0d9fa;
    color: #446cfe;
    border-radius: .5rem;
    border: 1px solid #2e5bff;
}
.kuaione{
  margin:0 auto;
  width:100%;
  height:1rem;
  background-color:transparent;
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