import React, { Component } from 'react'
import styled from 'styled-components'
import { List, Picker, DatePicker } from 'antd-mobile';

import { get_store, get_time ,sale_goods_by_payType,recharge_by_payType_store,recharge_by_store} from 'network/Api';
import F2 from '@antv/f2/lib/index-all'

export default class CollectionCompose extends Component {
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
            one:false,
            two:false,
            three:false,
            sale_by_payType:[]
        }
    }
    // 普通时间转格林时间方法
    StrToGMT(time) {
        let GMT = new Date(time)
        return GMT
    }
    // 选中事件
    active(e, index) {
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
            this.setState({
                start_time:res.data.data.start,
                end_time:res.data.data.end
            })
            sale_goods_by_payType({ action: 'sale_goods_by_payType', data: { end: res.data.data.end,
            start: res.data.data.start,
            storeid: "",
            uniacid: "53"} }).then(res=>{
                // console.log(res.data.data.sale_by_payType)
                var result = res.data.data.sale_by_payType.map(o => {
                    return { 
                        memo: o.type_name, 
                        ratio: Number(o["price"]),
                        const:"const",
                        amount: Number(o["price"])
                     }
                });
                // console.log(result)
    
    
                const chart = new F2.Chart({
                    id: 'mountNode',
                    width:350,
                    height:500,
                    pixelRatio: window.devicePixelRatio
                  });
                  
                  chart.source(result);
                  chart.coord('polar', {
                    transposed: true,
                    innerRadius: 0.4,
                    radius: 0.75
                  });
                  chart.axis(false);
                  chart.legend({
                    position: 'bottom',
                    align: 'center'
                  });
                  chart.tooltip(false);
                  chart.guide()
                    .html({
                      position: [ '50%', '50%' ],
                      html: '<div style="width: 100px;height: 20px;text-align: center;line-height: 20px;" id="textContent"></div>'
                    });
                  // 配置文本饼图
                  chart.pieLabel({
                    sidePadding: 75,
                    label1: function label1(result) {
                      return {
                        text: result.memo,
                        fill: '#808080'
                      };
                    },
                    label2: function label2(result) {
                      return {
                        fill: '#000000',
                        text: '$' + result.amount.toFixed(2),
                        fontWeight: 500,
                        fontSize: 10
                      };
                    }
                  });
                  chart.interval()
                    .position('const*ratio')
                    .color('memo', [ '#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0', '#3436C7', '#223273' ])
                    .adjust('stack');
                  chart.render();
                  
                  // 绘制内阴影
                  const frontPlot = chart.get('frontPlot');
                  const coord = chart.get('coord'); // 获取坐标系对象
                  frontPlot.addShape('sector', {
                    attrs: {
                      x: coord.center.x,
                      y: coord.center.y,
                      r: coord.circleRadius * coord.innerRadius * 1.2, // 全半径
                      r0: coord.circleRadius * coord.innerRadius,
                      fill: '#000',
                      opacity: 0.15
                    }
                  });
                  chart.get('canvas').draw();
            })
    


            let start = this.StrToGMT(res.data.data.start)
            let end = this.StrToGMT(res.data.data.end)
            this.setState({
                start: start,
                end: end
            })
        })
        let w = JSON.stringify(this.state.storeId)
        // 门店ID
        let id = w.substring(2, 4)
        // console.log(id)
        this.setState({
            bgcolor: "#2e5bff",
            color: "#fff",
            key: index
        })
    }
    componentDidMount() {
       
        sale_goods_by_payType({ action: 'sale_goods_by_payType', data: { end: "2020-09-18 23:59:59",
        start: "2020-09-18 00:00:00",
        storeid: "",
        uniacid: "53"} }).then(res=>{
            // console.log(res.data.data.sale_by_payType)
            var result = res.data.data.sale_by_payType.map(o => {
                return { 
                    memo: o.type_name, 
                    ratio: Number(o["price"]),
                    const:"const",
                    amount: Number(o["price"])
                 }
            });
            // console.log(result)


            const chart = new F2.Chart({
                id: 'mountNode',
                width:350,
                height:500,
                pixelRatio: window.devicePixelRatio
              });
              
              chart.source(result);
              chart.coord('polar', {
                transposed: true,
                innerRadius: 0.4,
                radius: 0.75
              });
              chart.axis(false);
              chart.legend({
                position: 'bottom',
                align: 'center'
              });
              chart.tooltip(false);
              chart.guide()
                .html({
                  position: [ '50%', '50%' ],
                  html: '<div style="width: 100px;height: 20px;text-align: center;line-height: 20px;" id="textContent"></div>'
                });
              // 配置文本饼图
              chart.pieLabel({
                sidePadding: 75,
                label1: function label1(result) {
                  return {
                    text: result.memo,
                    fill: '#808080'
                  };
                },
                label2: function label2(result) {
                  return {
                    fill: '#000000',
                    text: '$' + result.amount.toFixed(2),
                    fontWeight: 500,
                    fontSize: 10
                  };
                }
              });
              chart.interval()
                .position('const*ratio')
                .color('memo', [ '#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0', '#3436C7', '#223273' ])
                .adjust('stack');
              chart.render();
              
              // 绘制内阴影
              const frontPlot = chart.get('frontPlot');
              const coord = chart.get('coord'); // 获取坐标系对象
              frontPlot.addShape('sector', {
                attrs: {
                  x: coord.center.x,
                  y: coord.center.y,
                  r: coord.circleRadius * coord.innerRadius * 1.2, // 全半径
                  r0: coord.circleRadius * coord.innerRadius,
                  fill: '#000',
                  opacity: 0.15
                }
              });
              chart.get('canvas').draw();
        })

        var day2 = new Date();
        day2.setTime(day2.getTime());
        var s2 = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();
        this.setState({
            today_time: s2
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
    zhifu(){
        this.setState({
            one: true,
            two: false,
            three: false
        })
       

    }
    xuzhi(){
        this.setState({
            one: false,
            two: true,
            three: false
        })
        recharge_by_payType_store({ action: 'recharge_by_payType_store', data: { end: this.state.end_time,
            start: this.state.start_time,
            storeid: "",
            uniacid: "53"} }).then(res=>{
                // console.log(res)
                var result = res.data.data.recharge_by_payType.map(o => {
                    return { 
                        memo: o.type_name, 
                        ratio: Number(o["price"]),
                        const:"const",
                        amount: Number(o["price"])
                     }
                });
                // console.log(result)
    
    
                const chart = new F2.Chart({
                    id: 'mountNode',
                    width:350,
                    height:500,
                    pixelRatio: window.devicePixelRatio
                  });
                  
                  chart.source(result);
                  chart.coord('polar', {
                    transposed: true,
                    innerRadius: 0.4,
                    radius: 0.75
                  });
                  chart.axis(false);
                  chart.legend({
                    position: 'bottom',
                    align: 'center'
                  });
                  chart.tooltip(false);
                  chart.guide()
                    .html({
                      position: [ '50%', '50%' ],
                      html: '<div style="width: 100px;height: 20px;text-align: center;line-height: 20px;" id="textContent"></div>'
                    });
                  // 配置文本饼图
                  chart.pieLabel({
                    sidePadding: 75,
                    label1: function label1(result) {
                      return {
                        text: result.memo,
                        fill: '#808080'
                      };
                    },
                    label2: function label2(result) {
                      return {
                        fill: '#000000',
                        text: '$' + result.amount.toFixed(2),
                        fontWeight: 500,
                        fontSize: 10
                      };
                    }
                  });
                  chart.interval()
                    .position('const*ratio')
                    .color('memo', [ '#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0', '#3436C7', '#223273' ])
                    .adjust('stack');
                  chart.render();
                  
                  // 绘制内阴影
                  const frontPlot = chart.get('frontPlot');
                  const coord = chart.get('coord'); // 获取坐标系对象
                  frontPlot.addShape('sector', {
                    attrs: {
                      x: coord.center.x,
                      y: coord.center.y,
                      r: coord.circleRadius * coord.innerRadius * 1.2, // 全半径
                      r0: coord.circleRadius * coord.innerRadius,
                      fill: '#000',
                      opacity: 0.15
                    }
                  });
                  chart.get('canvas').draw();
            })
    }
    xzrk(){
        this.setState({
            one: false,
            two: false,
            three: true
        })
        recharge_by_store({ action: 'recharge_by_store', data: { end: this.state.end_time,
            start: this.state.start_time,
            storeid: "",
            uniacid: "53"} }).then(res=>{
                // console.log(res.data.data.sale_by_payType)
                var result =
                   [{ 
                        memo: "cc", 
                        ratio: 18,
                        const:"const",
                        amount: 18
                     }]
               
                // console.log(result)
    
    
                const chart = new F2.Chart({
                    id: 'mountNode',
                    width:350,
                    height:500,
                    pixelRatio: window.devicePixelRatio
                  });
                  
                  chart.source(result);
                  chart.coord('polar', {
                    transposed: true,
                    innerRadius: 0.4,
                    radius: 0.75
                  });
                  chart.axis(false);
                  chart.legend({
                    position: 'bottom',
                    align: 'center'
                  });
                  chart.tooltip(false);
                  chart.guide()
                    .html({
                      position: [ '50%', '50%' ],
                      html: '<div style="width: 100px;height: 20px;text-align: center;line-height: 20px;" id="textContent"></div>'
                    });
                  // 配置文本饼图
                  chart.pieLabel({
                    sidePadding: 75,
                    label1: function label1(result) {
                      return {
                        text: result.memo,
                        fill: '#808080'
                      };
                    },
                    label2: function label2(result) {
                      return {
                        fill: '#000000',
                        text: '$' + result.amount.toFixed(2),
                        fontWeight: 500,
                        fontSize: 10
                      };
                    }
                  });
                  chart.interval()
                    .position('const*ratio')
                    .color('memo', [ '#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0', '#3436C7', '#223273' ])
                    .adjust('stack');
                  chart.render();
                  
                  // 绘制内阴影
                  const frontPlot = chart.get('frontPlot');
                  const coord = chart.get('coord'); // 获取坐标系对象
                  frontPlot.addShape('sector', {
                    attrs: {
                      x: coord.center.x,
                      y: coord.center.y,
                      r: coord.circleRadius * coord.innerRadius * 1.2, // 全半径
                      r0: coord.circleRadius * coord.innerRadius,
                      fill: '#000',
                      opacity: 0.15
                    }
                  });
                  chart.get('canvas').draw();
            })
    }
    render() {
        return (
            <CollectionComposeStyle>
                <div>


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
                    <div className=''>
                        <ul className='fangshi'>
                            <li style={{marginLeft:".3rem",color:this.state.one===true?"#fff":'',backgroundColor:this.state.one===true?"#2e5bff":''}} onClick={()=>{this.zhifu()}}>支付方式</li>
                            <li style={{marginLeft:".4rem",color:this.state.two===true?"#fff":'',backgroundColor:this.state.two===true?"#2e5bff":''}} onClick={()=>{this.xuzhi()}}>储值方式</li>
                            <li style={{marginLeft:".5rem",color:this.state.three===true?"#fff":'',backgroundColor:this.state.three===true?"#2e5bff":''}} onClick={()=>{this.xzrk()}}>储值入口</li>

                        </ul>
                    </div>
                    <div className='store'>
                        <Picker
                            extra="全部门店"
                            value={this.state.storeId}
                            onOk={''}
                            onChange={data => this.setState({ storeId: data })}
                            data={this.state.data} cols={1} className="forss">
                            <List.Item
                                arrow="horizontal"
                                className='time'
                                style={{ width: "2.3rem", backgroundColor: "transparent", position: "absolute", top: "3rem", left: "-.2rem" }}
                            ></List.Item>
                        </Picker>
                    </div>
                    <canvas id="mountNode"></canvas>
                </div>
            </CollectionComposeStyle>
        )
    }
}
const CollectionComposeStyle = styled.div`

    .fangshi{
    margin-top:.4rem;
    
    display:flex;
    }
    .fangshi li{
    
    width: 2rem;
    height: .6rem;
    line-height: .6rem;
    text-align:center;
    background: #d0d9fa;
    color: #446cfe;
    border-radius: .5rem;
    border: 1px solid #2e5bff;
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