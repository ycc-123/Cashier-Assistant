import React, { Component } from 'react'
import styled from 'styled-components'
import { List, Picker, DatePicker } from 'antd-mobile';

import { get_store, get_time, refund_by_oroder_piece, refund_by_oroder_all } from 'network/Api';
import Goods from './goods'


export default class ShoppingGuide extends Component {
    constructor() {
        super()
        this.state = {
            bgcolor: "",
            date_month: [],
            key: '',
            value: null,
            date: '',
            data: [],
            storeId: [],
            start: '',
            start_data: '',
            end: '',
            end_data: '',
            time: '',
            jkend: '',
            jkstart: '',
            today_time: '',
            tuik: [],
            refund_order: []
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
        let id= w.substring(2, 4)
        if(id==="  "){
            id=""
           
        }
        
        
        
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
            console.log(res.data.data.end)
            let end= res.data.data.end 
            let start =res.data.data.start
            refund_by_oroder_piece({
                action: 'refund_by_oroder_piece',
                data: { end: end, start: start, store_id: id, uniacid: "53" }
            }).then(res => {
                
                this.setState({
                    refund_order: res.data.data.refund_order,
    
                })
            })
            refund_by_oroder_all({
                action: 'refund_by_oroder_all',
                data: { end: end, start: start, store_id: id, uniacid: "53" }
            }).then(res => {
    
            })
            let starts = this.StrToGMT(res.data.data.start)
            let ends = this.StrToGMT(res.data.data.end)
            this.setState({
                start: starts,
                end: ends
            })
        })
        // let w = JSON.stringify(this.state.storeId)
        // 门店ID
        // let id = w.substring(2, 4)
        // console.log(id)
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
        get_store().then(res => {
            var result = res.data.data.map(o => { return { value: o.id, label: o.name } });
            let bb = [{ value:"  ", label: "全部门店" }]
            this.setState({
                data: [...bb, ...result]
            })
        })
        refund_by_oroder_piece({
            action: 'refund_by_oroder_piece',
            data: { end: "2020-09-17", start: "2020-09-10", store_id: "", uniacid: "53" }
        }).then(res => {
            // console.log(res.data.data.refund_order)
            this.setState({
                refund_order: res.data.data.refund_order,

            })
        })
        refund_by_oroder_all({
            action: 'refund_by_oroder_all',
            data: { end: "2020-09-17", start: "2020-09-10", store_id: "", uniacid: "53" }
        }).then(res => {

        })


        this.setState({
            date_month: ["昨天", "今天", "近七天", "本月"],
            key: 1
        })
    }
    render() {
        return (
            <HotStyle>
                <div>
                    <div className='header'>
                        <span className='right-img'></span>
                        <div className='h_conten'>
                            <div>&nbsp;</div>
                            <div className='h_one_img'><img src="https://res.lexiangpingou.cn/images/826/2020/04/fGWhsQ01gNNNESUH55S95Z0aUUHGH1.png" alt="" /></div>
                            <div className='h_wen' style={{ color: "#fff" }}>全部门店</div>
                            <div className='h_two_img'><img src="https://res.lexiangpingou.cn/images/826/2020/04/zltxzLUIITsQVlXv7AUV2XUVtXII4M.png" alt="" /></div>
                        </div>
                        <Picker
                            extra="全部门店"
                            value={this.state.storeId}
                            onOk={''}
                            onChange={data => this.setState({ storeId: data })}
                            data={this.state.data} cols={1} className="forss">
                            <List.Item
                                arrow="horizontal"
                                className='time'
                                style={{ width: "2.3rem", backgroundColor: "transparent", position: "absolute", top: "-.07rem", left: "3.6rem" }}
                            ></List.Item>
                        </Picker>
                    </div>
                    <div>
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
                    <div style={{ width: "100%", height: ".2rem" }}></div>
                    <div className='leixing'>
                        <img src={require('assets/img/tk.png')} alt="" />
                        <Picker
                            extra="部分退款"
                            value={this.state.tuik}
                            onChange={data => this.setState({ tuik: data })}
                            data={[
                                {
                                    value: 1,
                                    label: "部分退款"
                                },
                                {
                                    value: 2,
                                    label: "全额退款"
                                }
                            ]} cols={1} className="forss">
                            <List.Item arrow="horizontal" className='time'
                                style={{ width: "2.3rem", backgroundColor: "transparent", position: "absolute", top: "3.15rem", left: "6.7rem" }}></List.Item>
                        </Picker>
                    </div>

                    <div>
                        {
                            this.state.refund_order.map((value, index) => {
                                // console.log(value)
                                return (
                                    <Goods key={index} value={value}></Goods>
                                )
                            })
                        }


                    </div>

                </div>
            </HotStyle>
        )
    }
}

const HotStyle = styled.div`
.price{
    width:100%;
    text-align: right;

}
.yuany{
    padding-top:.2rem;
    border-top:1px solid #ccc;

}
.sulian{
    padding-top:.2rem;
    display:flex;
    justify-content: space-between;
}
.fenlei{
    padding-top:.2rem;
}
.order{
    padding-top:.2rem;
}
.duikuanxianqing ul{
   position:relative;
    width:100%;
    height:1.9rem;
    // background-color:red;

}
.duikuanxianqing{
    margin-top:.2rem;
    padding:.3rem;
    margin-left:.3rem;
    width: 9.3rem;
    height: 4rem;
    background-color:#fff;


}
.leixing{
    height:1.5rem;
}
.leixing img{
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
// margin-left:.2rem;
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
position:relative;
display:flex;
height:1rem;
width:100%;
background-color:#fff;
}

`