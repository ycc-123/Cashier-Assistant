import React, { Component } from 'react'
import styled from 'styled-components'



export default class MemberBusiness extends Component {
    render() {
        return (
            <MemberBusinessStyle>
            <div>

                <div className='header_img'>
                    <div className='memberzhong'></div>
                    <div className='bishu'></div>
                    <div className='money'></div>
                    <div className='yure'></div>
                    <div className='memberrensu'></div>
                    <div className='bisu'></div>
                    <div className='jiner'></div>
                    <div className='danjia'></div>
                    <img src={require('assets/img/MemberBusiness.png')} alt=""/>
                    </div>
            </div>
            </MemberBusinessStyle>
        )
    }
}
const MemberBusinessStyle = styled.div`
.header_img{
    position:relative;
}
.header_img img{
    width:100%;
    height:100%;
}


`