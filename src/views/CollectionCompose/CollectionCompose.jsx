import React, { Component } from 'react'
import styled from 'styled-components'
import { List ,DatePicker} from 'antd-mobile';

export default class CollectionCompose extends Component {
    constructor() {
        super()
        this.state = {
            bgcolor: "",
            date_month: [],
            key: "",
            value: null,
            date:''
        }
    }
    active(e, index) {
        this.setState({
            bgcolor: "#2e5bff",
            color: "#fff",
            key: index
        })
    }
    componentDidMount() {
    
    
        this.setState({
            date_month: ["昨天", "今天", "本周", "本月"]
        })
    }
    render() {
        return (
            <HotStyle>
                <div>
                   
                    <div>
                    </div>
                    
                    <div style={{display:"flex"}}>
                    <div className='start'>
                        <DatePicker
                            mode="date"
                            title=""
                            extra="2020-09-10"
                            onOk={console.log(this.state.date)}
                            value={this.state.date}
                            onChange={date => this.setState({ date })}
                        >
                            <List.Item arrow="horizontal" className='data'></List.Item>
                        </DatePicker>
                    </div>
                    <span style={{fontSize:".5rem",paddingTop:".5rem"}}>&nbsp;~</span>
                    <div className='end'>
                        <DatePicker
                            mode="date"
                            title=""
                            extra="2020-09-10"
                            onOk={console.log(this.state.date)}
                            value={this.state.date}
                            onChange={date => this.setState({ date })}
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
                </div>
            </HotStyle>
        )
    }
    }
    
    const HotStyle = styled.div`
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
    // .time{
    //     position:absolute;
    //     left:4rem;
    //     top:-.3rem;
    //     color: transparent;
    //     background-color: transparent;
    // }
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
