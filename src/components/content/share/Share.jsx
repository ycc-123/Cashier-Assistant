import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Toast } from 'antd-mobile'
import copy from 'copy-to-clipboard'

import { getWXConfig } from 'commons/utils'

const wx = window.wx




class Share extends Component {
  constructor(props) {
    super(props);
    this.state = {
      share: [
        { id: 100101010101, content: '复制链接', src: require('assets/img/share1.png') },
        { id: 100101010102, content: '分享链接', src: require('assets/img/share2.png') },
        { id: 100101010103, content: '生成图片', src: require('assets/img/share3.png') },
      ],
      wxShare: false
    }
  }
  render() {
    const { share, wxShare } = this.state
    const { active } = this.props
    console.log(this.props)
    return (
      <ShareStyle>
        <div className='mark' style={{ display: active ? 'block' : 'none' }} onClick={this.clone}>
          <div className='clone' style={{ display: wxShare ? 'block' : 'none' }}>
            <img src={require('assets/img/chacha.png')} className='cha' />
          </div>
          <img src={require('assets/img/sharejiantou.png')} alt='' className='jiantou' style={{ display: wxShare ? 'block' : 'none' }} />
        </div>
        <ul className='box' style={{ bottom: active ? 0 : '-2.81rem' }}>
          {share.map((item, index) => {
            return (
              <li key={item.id + index} className='share-img'>
                <div>
                  <img className='img' src={item.src} alt="''" onClick={() => { this.click(index) }} />
                  <div className='content'>{item.content}</div>
                </div>
              </li>
            )
          })}
        </ul>
      </ShareStyle>
    )
  }
  click = async index => {
    const { type } = this.props


    // type 0 首页 1 详情页 2 组团页
    if (index === 0) {
      this.copyUrl()
      // 首页
      if (type === 0) {
        this.props.show()
      }
    } else if (index === 1) {
      this.setState({
        wxShare: true
      })
    } else if (index === 2) {
      if (type === 0) {
        this.setState({
          wxShare: false
        }, () => {
          this.props.changeActive()
          this.props.show()
          this.props.history.push('/homeshare')
        })

      } else if (type === 1) {
        this.setState({
          wxShare: false
        }, () => {
          console.log(this.props)
          this.props.history.push(`/detailshare/${this.props.match.params.id}`)
        })

      }

    }


  }

  clone = () => {
    const { wxShare } = this.state
    if (wxShare) {
      this.setState({
        wxShare: false
      }, () => {
        this.props.changeActive()
        this.props.show()
      })
    } else {
      this.props.changeActive()
    }

  }

  copyUrl = () => {
    copy(window.location.href)
    Toast.info('复制成功', 1)
    // message.success('复制成功，如果失败，请在输入框内手动复制');
    console.log(this.props)
    this.props.changeActive()
  }

}

const ShareStyle = styled.div`

.jiantou {
  position: absolute;
  top: .2rem;
  right: .4rem;
}

.clone {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  width: .8rem;
  height: .8rem;
  border-radius: 50%;
  transform: translate(-50%, 0);
  background: #fff;
}

.cha {
  width: .8rem;
  height: .8rem;
}


.mark {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,.5);
}

.box {
  position: absolute;
  z-index: 9999;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  width: 100%;
  height: 2.81rem;
  background: #fff;
  transition: bottom .3s;
}

.share-img {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
}

.content {
  text-align: center;
  font-size: .32rem;
}

.img {
  width: 1.49rem;
  height: 1.49rem;
}
`

export default withRouter(Share)