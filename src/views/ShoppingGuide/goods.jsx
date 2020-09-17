import React, { Component } from 'react'


// function Tuik(value) {
//     console.log(value.value.goods)
//     let item = value.value.goods
//     return (

//     )
// }
export default class Goods extends Component {
    constructor(props) {
        super(props)
        this.state = {
        
        }
    }
    render() {
        // console.log(this.props.value)
        let item = this.props.value
        let goods = this.props.value.goods

        // goods.map((value, index) => {
        //     console.log(value)
            // this.setState({
            //     good:value
            // })
        // })
        return (
            <div className='duikuanxianqing'>
                <div className='order'>{item.orderno}</div>
                {
                    goods.map((value, index) => {
                        console.log(value)
                        return (
                            <ul key={index}>
                                <li className='good_name'>{value.goods_name}</li>

                                <li className='fenlei'>
                                    <span>分类:{value.category_name}</span>
                                    <span style={{paddingLeft:".4rem"}}>售出单位:{value.unitname}</span>
                                </li>
                                <li className='sulian'>
                                    
                                    <div >数量/重量:{value.num}{value.unitname}</div>
                                    
                                </li>
                                
                            </ul>
                        )
                    })
                }
                <span className='price' style={{paddingLeft: "7rem"}}>-￥{item.refund_fee}</span>
                <div className='yuany'>退款原因：{item.reason}</div>
            </div>
        )
    }
}
