import React, { Component } from 'react'

import Swiper from 'swiper'
import "swiper/css/swiper.css"


class SwiperComponent extends Component {
  render() {
    const { config, dataList } = this.props
    return (
      <div className='Swiper' style={config}>
        <div className="swiper-container banner-swiper" ref='swiper'>
          <div className="swiper-wrapper" ref='wrapper'>
            {dataList.map((item, index) => {
              return (
                <div key={item.id + index} className='swiper-slide'>
                  <img className='banner-img' src={item.thumb} alt="" onClick={() => { this.go(item.link) }} />
                </div>
              )
            })}
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    );
  }
  /*  componentWillUnmount() {
     if (this.swiper) { // 销毁swiper
       this.swiper.destroy()
     }
   } */

  go = (link) => {
    window.location.href = link

  }


  componentDidMount = () => {
    // const that = this
    if (this.swiper) {
      this.swiper.destroy(false)
      this.swiper = null
    }
    this.swiper = new Swiper(this.refs.swiper, {
      /*  loop: true,     */ // 是否循环
      freeMode: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      },     // 自动播放   时间为4秒
      speed: 2000,        // 速度   越小越快
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      observer: true,//修改swiper自己或子元素时，自动初始化swiper
      observeSlideChildren: true,
      observeParents: true,//修改swiper的父元素时，自动初始化swiper
      on: {
        slideChangeTransitionEnd() {
          this.update()
        }
      }
    })


    let wrapper = this.refs.wrapper
    let promise = Array.prototype.map.call(wrapper.querySelectorAll('img'), function (img) {
      return new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
      })
    })
    Promise.all(promise).then(() => {
      if(this.props.refresh) {
        this.props.refresh()
      }
    })

  }
}


export default SwiperComponent;