import React, { Component } from 'react'
import styled from 'styled-components'
import { mb_TotalMember, mb_StoredTotal, mb_NewMember, mb_StoredValueOverview } from 'network/Api'

export default class MemberBusiness extends Component {
    constructor() {
        super()
        this.state = {
            huiyuanzhong: '',
            memberchuzhi: '',
            shouyin: '2',
            num: "",
            Overview: []
        }
    }
    componentDidMount() {
        mb_StoredValueOverview({ action: 'mb_StoredValueOverview', data: { uniacid: 53, date: "今天" } }).then(res => {
            this.setState({
                Overview: res.data.data
            })
        })
        mb_NewMember({ action: 'mb_NewMember', data: { uniacid: 53, date: "今天" } }).then(res => {
            this.setState({
                num: res.data.data.num
            })
        })
        mb_StoredTotal().then(res => {
            let memberchuzhi = res.data.data
            this.setState({
                memberchuzhi
            })
        })
        mb_TotalMember().then(res => {
            this.setState({
                huiyuanzhong: res.data.data.totalMembers
            })
        })
    }
    one(e, a) {
        mb_StoredValueOverview({ action: 'mb_StoredValueOverview', data: { uniacid: 53, date: "昨天" } }).then(res => {
            this.setState({
                Overview: res.data.data
            })
        })
        mb_NewMember({ action: 'mb_NewMember', data: { uniacid: 53, date: "昨天" } }).then(res => {
            this.setState({
                shouyin: a,
                num: res.data.data.num
            })
        })

    }
    two(e, b) {
        mb_StoredValueOverview({ action: 'mb_StoredValueOverview', data: { uniacid: 53, date: "今天" } }).then(res => {
            this.setState({
                Overview: res.data.data
            })
        })
        mb_NewMember({ action: 'mb_NewMember', data: { uniacid: 53, date: "今天" } }).then(res => {
            this.setState({
                shouyin: b,
                num: res.data.data.num

            })
        })

    }
    three(e, c) {
        mb_StoredValueOverview({ action: 'mb_StoredValueOverview', data: { uniacid: 53, date: "近七天" } }).then(res => {
            this.setState({
                Overview: res.data.data
            })
        })
        mb_NewMember({ action: 'mb_NewMember', data: { uniacid: 53, date: "近七天" } }).then(res => {
            this.setState({
                shouyin: c,
                num: res.data.data.num
            })
        })

    }
    render() {
        let a = "1"
        let b = "2"
        let c = "3"
        return (
            <MemberBusinessStyle>
                <div>

                    <div className='header_img'>
                        <div className='memberzhong'>{this.state.huiyuanzhong}</div>
                        <button className='btn'>查看详情</button>
                        <div className='bishu'>{this.state.memberchuzhi.count}</div>
                        <div className='money'>{this.state.memberchuzhi.member_amount}</div>
                        <div className='yure'>{this.state.memberchuzhi.members_sum}</div>
                        <div className='memberrensu'>{this.state.num}</div>
                        <div className='bisu'>{this.state.Overview.number}</div>
                        <div className='jiner'>{this.state.Overview.money}</div>
                        <div className='danjia' >{this.state.Overview.unitPrice}</div>
                        <ul className='data'>
                            <li className='one' onClick={(e) => { this.one(e, a) }} style={{ backgroundColor: this.state.shouyin === a ? "#2e5bff" : '', color: this.state.shouyin === a ? "#fff" : '' }}>昨天</li>
                            <li className='two' onClick={(e) => { this.two(e, b) }} style={{ backgroundColor: this.state.shouyin === b ? "#2e5bff" : '', color: this.state.shouyin === b ? "#fff" : '' }}>今天</li>
                            <li className='three' onClick={(e) => { this.three(e, c) }} style={{ backgroundColor: this.state.shouyin === c ? "#2e5bff" : '', color: this.state.shouyin === c ? "#fff" : '' }}>近七天</li>
                        </ul>
                        <img className='h_img' src={require('assets/img/MemberBusiness.png')} alt="" />

                    </div>
                </div>
            </MemberBusinessStyle>
        )
    }
}
const MemberBusinessStyle = styled.div`
.data .two{
    position:absolute;
    top:5.7rem;
    left:4.5rem;
    border-radius: .5rem;
    border: 1px solid #ccc;
    color:#474747;
    width:1.2rem;
    height:.5rem;
    line-height:.5rem;
    text-align:center;
}
.data .three{
    position:absolute;
    top:5.7rem;
    left:6.1rem;
    border-radius: .5rem;
    border: 1px solid #ccc;
    color:#474747;
    width:1.2rem;
    height:.5rem;
    line-height:.5rem;
    text-align:center;
}

.data{
    display:flex;
    justify-content: space-around;
}
.data .one{
    position:absolute;
    top:5.7rem;
    left:2.9rem;
    border-radius: .5rem;
    border: 1px solid #ccc;
    color:#474747;
    width:1.2rem;
    height:.5rem;
    line-height:.5rem;
    text-align:center;
}
.btn{
    position:absolute;
    top:2.1rem;
    left:3.7rem;
    // background-color:transparent;
    width:2.5rem;
    height:.7rem;
    line-height:.7rem;
    text-align:center;
    border-radius: 3rem;

}
.danjia{
    position:absolute;
    top:7.4rem;
    left:7.5rem;
    background-color:transparent;
    width:2rem;
    height:.8rem;
    line-height:.8rem;
    text-align:center;
}
.jiner{
    position:absolute;
    top:7.4rem;
    left:5.2rem;
    background-color:transparent;
    width:2rem;
    height:.8rem;
    line-height:.8rem;
    text-align:center;
}
.bisu{
    position:absolute;
    top:7.4rem;
    left:2.9rem;
    background-color:transparent;
    width:2rem;
    height:.8rem;
    line-height:.8rem;
    text-align:center;
}
.memberrensu{
    position:absolute;
    top:7.4rem;
    left:.6rem;
    background-color:transparent;
    width:2rem;
    height:.8rem;
    line-height:.8rem;
    text-align:center;
}
.yure{
    position:absolute;
    top:4.1rem;
    left:7.3rem;
    background-color:transparent;
    width:2rem;
    height:.8rem;
    line-height:.8rem;
    text-align:center;
}
.money{
    position:absolute;
    top:4.1rem;
    left:4rem;
    background-color:transparent;
    width:2rem;
    height:.8rem;
    line-height:.8rem;
    text-align:center;
}
.bishu{
    position:absolute;
    top:4.1rem;
    left:.7rem;
    background-color:transparent;
    width:2rem;
    height:.8rem;
    line-height:.8rem;
    text-align:center;
}
.memberzhong{
    position:absolute;
    top:1rem;
    left:3rem;
    background-color:transparent;
    width:4rem;
    height:1rem;
    line-height:1rem;
    text-align:center;
}
.h_img{
    
}
.header_img{
    position:relative;
}
.header_img img{
    width:100%;
    height:100%;
}


`