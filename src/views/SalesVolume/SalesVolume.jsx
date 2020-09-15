import React, { Component } from 'react'
import styled from 'styled-components'
import { List, Picker, DatePicker } from 'antd-mobile';
import { get_store, get_goods_category, sale_goods_total } from 'network/Api'

// function Goods(value){
//     return(
//         <div className='goods'>
//             <img src={require('assets/img/good.png')} alt=""/>
//         </div>
//     )
// }

export default class SalesVolume extends Component {
    constructor(props) {
        super()
        this.state = {
            data: [],
            storeId: '',
            fenlei: [],
            fenleiId: '',
            today_time: '',
            sale_by_goods: []

        }
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
            let bb = [{ value: '', label: "全部门店" }]
            this.setState({
                data: [...bb, ...result]
            })
        })
        get_goods_category().then(res => {
            console.log(res)
            var result = res.data.data.category_list.map(o => { return { value: o.id, label: o.name } });
            let bb = [{ value: '', label: "全部分类" }]
            console.log([...bb, ...result])
            this.setState({
                fenlei: [...bb, ...result]
            })
        })
        sale_goods_total({
            action: 'sale_goods_total',
            data: { categoryid: "", end: "2020-04-30", search: "", start: "2020-04-01", store_id: "", uniacid: "53" }
        }).then(res => {
            console.log(res)
            this.setState({
                sale_by_goods: res.data.data.sale_by_goods
            })
        })

    }
    render() {
        return (
            <SalesVolumeStyle>
                <div>
                    <div className='hearder'>
                        <img src={require('assets/img/search.png')} alt="" />
                        <input type="text" className='input' />
                        <button className='search_btn'>搜索</button>
                    </div>
                    <div style={{ position: "relative" }}>
                        <Picker
                            extra="全部门店"
                            value={this.state.storeId}
                            onOk={''}
                            onChange={data => this.setState({ storeId: data })}
                            data={this.state.data} cols={1} className="forss">
                            <List.Item
                                arrow="horizontal"
                                className='time'
                                style={{ width: "2.3rem", backgroundColor: "transparent", position: "absolute", top: "-.27rem", left: "-.4rem" }}
                            ></List.Item>
                        </Picker>
                    </div>
                    <div style={{ position: "relative" }}>
                        <Picker
                            extra="全部分类"
                            value={this.state.fenleiId}
                            onOk={''}
                            onChange={fenlei => this.setState({ fenleiId: fenlei })}
                            data={this.state.fenlei} cols={1} className="forss">
                            <List.Item
                                arrow="horizontal"
                                className='time'
                                style={{ width: "2.3rem", backgroundColor: "transparent", position: "absolute", top: "-.27rem", left: "2rem" }}
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
                                <List.Item arrow="horizontal" className='data'
                                    style={{ width: "3rem", backgroundColor: "transparent", position: "absolute", top: "1.2rem", right: "3rem" }}

                                ></List.Item>
                            </DatePicker>
                        </div>
                        <span style={{ fontSize: ".5rem", paddingTop: ".5rem", position: "absolute", top: "1.2rem", right: "2.55rem" }}>&nbsp;~</span>
                        <div className='end'>
                            <DatePicker
                                mode="date"
                                title=""
                                extra={this.state.today_time}
                                onOk={''}
                                value={this.state.end}
                                onChange={end => this.setState({ end, end_data: end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate() })}
                            >
                                <List.Item arrow="horizontal" className='data'
                                    style={{ width: "3rem", backgroundColor: "transparent", position: "absolute", top: "1.2rem", right: ".2rem" }}

                                ></List.Item>
                            </DatePicker>
                        </div>
                    </div>
                    <div style={{ width: "100%", height: ".7rem" }}></div>
                    <div className='Goods'>
                        {/* {
                            this.state.sale_by_goods.map((value,key)=>{
                                return(
                                    <div key={key}>
                                    <Goods value={value}/>
                                    </div>
                                )
                                
                            })
                        } */}
                        <div className='goods'>
                            <img src={require('assets/img/good.png')} alt="" />
                            <div className=''></div>
                            <div className=''></div>
                            <div className=''></div>
                            <div className=''></div>
                            <div className=''></div>

                        </div>
                    </div>
                </div>
            </SalesVolumeStyle>
        )
    }
}
const SalesVolumeStyle = styled.div`
.goods img{

    width:100%;
    height:100%;
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
.search_btn{
    position:absolute;
    top:.3rem;
    left:7.7rem;
    color:#fff;
    background-color:#2e5bff;
    width:2rem;
    height:.8rem;
    border-radius: .5rem;
}
.input{
    width:5rem;
    height:.6rem;
    background-color:transparent;
    border:none;
    position:absolute;
    top:.4rem;
    left:1.2rem;
}
.hearder img{
    position:relative;
    width:100%;
    height:100%;
}

`