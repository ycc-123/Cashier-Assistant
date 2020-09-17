import React, { Component } from 'react'
import styled from 'styled-components'
import { List, Picker, DatePicker } from 'antd-mobile';
import { get_store, get_goods_category, sale_goods_total } from 'network/Api'

function Goods(value) {
    let item = value.value
    return (
        <div className='goods'>
            <img src={require('assets/img/good.png')} alt="" />
            <div className='store_name'>{item.store_name}</div>
            <div className='good_name'>{item.goods_name}</div>
            <div className='barcode'>{item.barcode}</div>
            <div className='fenglei'>{item.category_name}</div>
            <div className='unitone'>{item.unitname}</div>
            <div className='unittwo'>{item.unitname}</div>
            <div className='xianshouer'>{item.total_pay}</div>
            <div className='xiaoshoulian'>{item.total_num}</div>
        </div >
    )
}

export default class SalesVolume extends Component {
    constructor(props) {
        super()
        this.state = {
            inputAmount: '',
            data: [],
            storeId: '',
            fenlei: [],
            fenleiId: '',
            today_time: '',
            sale_by_goods: [],
            start: '',
            end: '',
            start_data: "",
            end_data: ""

        }
    }
    componentDidMount() {

        var day2 = new Date();
        day2.setTime(day2.getTime());
        var s2 = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();

        this.setState({
            today_time: "2020-04-30",
            start_data: "2020-04-01",
            end_data: s2
        })
        get_store().then(res => {
            var result = res.data.data.map(o => { return { value: o.id, label: o.name } });
            let bb = [{ value:"  ", label: "全部门店" }]
            this.setState({
                data: [...bb, ...result]
            })
        })
        get_goods_category().then(res => {
            // console.log(res)
            var result = res.data.data.category_list.map(o => { return { value: o.id, label: o.name } });
            let bb = [{ value:"  ", label: "全部分类" }]
            // console.log([...bb, ...result])
            this.setState({
                fenlei: [...bb, ...result]
            })
        })
        sale_goods_total({
            action: 'sale_goods_total',
            data: { categoryid: "", end: "2020-04-30", search: "", start: "2020-04-01", store_id: "", uniacid: "53" }
        }).then(res => {
            // console.log(res)
            this.setState({
                sale_by_goods: res.data.data.sale_by_goods
            })
        })

    }
    search() {
        let w = JSON.stringify(this.state.storeId)
        let id = w.substring(2, 4)
        let fenlei = JSON.stringify(this.state.fenleiId)
        let fenleiid = fenlei.substring(2, 4)
        if(id==="  "){
            id=""
            this.setState({
                data:""
            })
        }
        sale_goods_total({
            action: 'sale_goods_total',
            data: { categoryid: fenleiid, end: this.state.end_data, search: this.state.inputAmount, start: this.state.start_data, store_id: id, uniacid: "53" }
        }).then(res => {
            // console.log(res)
            if (res.data.data === undefined) {
                this.setState({
                    sale_by_goods: []
                })
            } else {
                this.setState({
                    sale_by_goods: res.data.data.sale_by_goods ? res.data.data.sale_by_goods : ''
                })
            }
        })

    }
    inputChange(e) {
        let name = e.target.name
        let value = e.target.value
        // console.log(value)
        this.setState({
            [name]: value
        })
    }
    xzmdian(data) {
        let w = JSON.stringify(data)
        let id = w.substring(2, 4)
        let fenlei = JSON.stringify(this.state.fenleiId)
        let fenleiid = fenlei.substring(2, 4)
        if(id==="  "){
            id=""
            this.setState({
                data:""
            })
        }
        

        sale_goods_total({
            action: 'sale_goods_total',
            data: { categoryid: fenleiid, end: this.state.end_data, search: this.state.inputAmount, start: this.state.start_data, store_id: id, uniacid: "53" }
        }).then(res => {
            // console.log(res)
            if (res.data.data === undefined) {
                this.setState({
                    sale_by_goods: []
                })
            } else {
                this.setState({
                    sale_by_goods: res.data.data.sale_by_goods ? res.data.data.sale_by_goods : ''
                })
            }
        })

    }
    fenleis(e) {
        // console.log("qqq")
        let w = JSON.stringify(this.state.storeId)
        let id = w.substring(2, 4)
        let fenlei = JSON.stringify(e)
        let fenleiid = fenlei.substring(2, 4)
        if(fenleiid==="  "){
            fenleiid=""
            this.setState({
                fenleiId:""
            })
        }
        if(id==="  "){
            id=""
            this.setState({
                data:""
            })
        }
        sale_goods_total({
            action: 'sale_goods_total',
            data: { categoryid: fenleiid, end: this.state.end_data, search: this.state.inputAmount, start: this.state.start_data, store_id: id, uniacid: "53" }
        }).then(res => {
            // console.log(res)
            if (res.data.data === undefined) {
                this.setState({
                    sale_by_goods: []
                })
            } else {
                this.setState({
                    sale_by_goods: res.data.data.sale_by_goods ? res.data.data.sale_by_goods : ''
                })
            }
        })
    }
    times(e) {
        // console.log(e)
        let end = e.getFullYear() + '-' + (e.getMonth() + 1) + '-' + e.getDate()
        let w = JSON.stringify(this.state.storeId)
        let id = w.substring(2, 4)
        let fenlei = JSON.stringify(this.state.fenleiId)
        let fenleiid = fenlei.substring(2, 4)
        if(id==="  "){
            id=""
            this.setState({
                data:""
            })
        }
        sale_goods_total({
            action: 'sale_goods_total',
            data: { categoryid: fenleiid, end: end, search: this.state.inputAmount, start: this.state.start_data, store_id: id, uniacid: "53" }
        }).then(res => {
            console.log(res)
            if (res.data.data === undefined) {
                this.setState({
                    sale_by_goods: []
                })
            } else {
                this.setState({
                    sale_by_goods: res.data.data.sale_by_goods ? res.data.data.sale_by_goods : ''
                })
            }
        })
    }
    render() {
        return (
            <SalesVolumeStyle>
                <div>
                    <div className='hearder'>
                        <img src={require('assets/img/search.png')} alt="" />
                        <input type="text" className='input' placeholder='请输入商品名称/商品编码/国际条形码' onChange={this.inputChange.bind(this)}
                            value={this.state.inputAmount}
                            name="inputAmount" />
                        <button className='search_btn' onClick={() => { this.search() }}>搜索</button>
                    </div>
                    <div style={{ position: "relative" }}>
                        <Picker
                            extra="全部门店"
                            value={this.state.storeId}
                            onOk={(data) => { this.xzmdian(data) }}
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
                            onOk={(fenlei) => { this.fenleis(fenlei) }}
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
                                onOk={(end) => { this.times(end) }}
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
                        {
                            this.state.sale_by_goods.map((value, key) => {
                                return (
                                    <div key={key}>
                                        <Goods value={value} />
                                    </div>
                                )

                            })
                        }

                    </div>
                </div>
            </SalesVolumeStyle>
        )
    }
}
const SalesVolumeStyle = styled.div`
.barcode{
    position:absolute;
    top:1.3rem;
    left: 2.8rem;
}
.xiaoshoulian{
    position:absolute;
    top:2.4rem;
    left: 7.9rem;
}
.xianshouer{
    position:absolute;
    top:2.9rem;
    left:7.9rem;
}
.unittwo{
    position:absolute;
    top:2.9rem;
    left: 2.2rem;
}
.unitone{
    position:absolute;
    top:2.45rem;
    left: 2.2rem;
}
.fenglei{
    position:absolute;
    top:2rem;
    left: 1.5rem;
}
.good_name{
    position:absolute;
    top:1.3rem;
    left: .7rem;
}
.store_name{
    position:absolute;
    top:.4rem;
    left:1.5rem;
}
.goods{
    position:relative;
    // background-color:red;
    // height:2rem;
    // width:2rem;

}
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
    width:7rem;
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