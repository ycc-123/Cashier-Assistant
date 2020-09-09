import React, { Component } from 'react'
import styled from 'styled-components'


export default class ShoppingGuide extends Component {
    constructor(){
        super()
        this.state={
            bgcolor: "", 
            date_month:[],
            key:""
        }
    }
    active(e,index){
        this.setState({
            bgcolor: "#2e5bff",
            color:"#fff",
            key:index
        })
    }
    componentDidMount(){
        this.setState({
            date_month:["昨天","今天","本周","本月"]
        })
    }
    render() {
        return (
            <ShoppingGuideStyle>
                <div>
                    <div className='header'>
                        <span className='right-img'>
                        </span>
                        <div className='h_conten'>
                            <div className='h_one_img'><img src="https://res.lexiangpingou.cn/images/826/2020/04/fGWhsQ01gNNNESUH55S95Z0aUUHGH1.png" alt="" /></div>
                            <div className='h_wen'>全部门店</div>
                            <div className='h_two_img'><img src="https://res.lexiangpingou.cn/images/826/2020/04/zltxzLUIITsQVlXv7AUV2XUVtXII4M.png" alt="" /></div>
                        </div>
                    </div>

                    <div className='conten'>
                        <ul className='date_month'>
                            {
                                this.state.date_month.map((v,index)=>{
                                    return(
                                        <li onClick={(e)=>this.active(e,index)} key={v}
                                        style={{backgroundColor:this.state.key===index?this.state.bgcolor:'',color:this.state.key===index?this.state.color:""}}>{v}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </ShoppingGuideStyle>
        )
    }
}

const ShoppingGuideStyle = styled.div`
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
    display:flex;
    height:1rem;
    width:100%;
    background-color:#fff;
  }
    
`