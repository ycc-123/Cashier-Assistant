import React, { Component } from 'react'
import styled from 'styled-components'



export default class MemberBusiness extends Component {
    render() {
        return (
            <MemberBusinessStyle>
            <div>

                <div className='header_img'>
                    <div className='memberzhong'>111</div>
                    <button className='btn'>查看详情</button>
                    <div className='bishu'>111</div>
                    <div className='money'>111</div>
                    <div className='yure'>111</div>
                    <div className='memberrensu'>222</div>
                    <div className='bisu'>222</div>
                    <div className='jiner'>333</div>
                    <div className='danjia' >33333</div>
                    <img className='h_img' src={require('assets/img/MemberBusiness.png')} alt=""/>
                    
                </div>
            </div>
            </MemberBusinessStyle>
        )
    }
}
const MemberBusinessStyle = styled.div`
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