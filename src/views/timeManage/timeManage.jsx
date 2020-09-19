import React, { Component } from 'react'
import styled from 'styled-components'
import { List, Picker, DatePicker } from 'antd-mobile';

import { get_store, get_time, sale_goods_by_time } from 'network/Api';

import F2 from '@antv/f2';
import insertCss from 'insert-css';


insertCss(`
  .chart-wrapper {
    position: relative;
  }
  .f2-tooltip {
    -moz-box-shadow: 1px 1px 0.5px 0.5px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 1px 1px 0.5px 0.5px rgba(0, 0, 0, 0.3);
    box-shadow: 1px 1px 0.5px 0.5px rgba(0, 0, 0, 0.3);
    position: absolute;
    z-index: 99;
    background-color: #1890ff;
    padding: 5px;
    border-radius: 3px;
    text-align: center;
    width: 120px;
    opacity: 0;
  }
  .f2-tooltip:after {
    content: " ";
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 8px solid #1890ff;
    position: absolute;
    left: 50%;
    margin-left: -6px;
    bottom: -8px;
  }
  .f2-tooltip span {
    display: block;
    color: #fff;
  }
  .f2-tooltip span:nth-child(1) {
    font-size: 11px !important;
  }
  .f2-tooltip span:nth-child(2) {
    font-size: 13px !important;
  }
`);


export default class TimeManage extends Component {
    constructor() {
        super()
        this.state = {
            bgcolor: "",
            date_month: [],
            key: "",
            value: null,
            date: '',
            storeId: ''
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

        get_time({ action: 'get_time', data: { date: "当天" } }).then(res => {
            console.log(res.data.data.end)
            sale_goods_by_time({
                action: 'sale_goods_by_time',
                data: { end: res.data.data.end, start: res.data.data.start, type: "1", store_id: "", uniacid: "53" }
            }).then(res => {
                console.log(res.data.data.sale_by_time)
                var result = res.data.data.sale_by_time.map(o => {
                    return { date: new Date(parseInt(o.time) * 1000), value: Number(o["total_num"]) }
                });
                console.log(result)

                const chart = new F2.Chart({
                    id: 'container',
                    pixelRatio: window.devicePixelRatio,
                    padding: [30, 50, 'auto']
                });
                chart.source(result, {
                    date: {
                        type: 'timeCat',
                        mask: 'D.MMM',
                        range: [0, 1],
                        tickCount: 8
                    },
                    value: {
                        tickCount: 5
                    }
                });
                chart.axis('date', {
                    tickLine: {
                        length: 5,
                        stroke: '#e8e8e8',
                        lineWidth: 1
                    }
                });
                chart.axis('value', {
                    grid: {
                        lineDash: null
                    }
                });
                chart.tooltip({
                    custom: true,
                    showCrosshairs: false,
                    onChange: function onChange(ev) {
                        const tooltipEl = document.querySelector('.f2-tooltip');
                        const currentData = ev.items[0];
                        //   const text = currentData.value;

                        tooltipEl.css({
                            opacity: 1,
                            left: currentData.x - tooltipEl.outerWidth() / 2 + 'px',
                            top: currentData.y - tooltipEl.outerHeight() - 15 + 'px'
                        });
                    },
                    onHide: function onHide() {
                        const tooltipEl = document.querySelector('.f2-tooltip');
                        tooltipEl.css({
                            opacity: 0
                        });
                    }
                });
                chart.area()
                    .position('date*value')
                    .shape('smooth')
                    .style({
                        fillOpacity: 0.85
                    });
                chart.render();


            });
        })



        var day2 = new Date();
        day2.setTime(day2.getTime());
        var s2 = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();
        this.setState({
            today_time: s2
        })
        get_store().then(res => {
            var result = res.data.data.map(o => { return { value: o.id, label: o.name } });
            let bb = [{ value: "  ", label: "全部门店" }]
            this.setState({
                data: [...bb, ...result]
            })
        })

        this.setState({
            date_month: ["昨天", "今天", "本周", "本月"]
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
                    </div>

                    <canvas id="container"></canvas>




                </div>
            </HotStyle>
        )
    }
}

const HotStyle = styled.div`
    .start{
     width:3rem;
     height:1rem;
     margin:0 auto;
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