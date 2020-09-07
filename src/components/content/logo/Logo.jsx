import React, { Component } from 'react';
import { Modal } from "antd-mobile";
import styled from 'styled-components'

class BottomLogo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: 'https://dev.huodiesoft.com/addons/lexiangpingou/app/resource/images/icon/logo.png',
      version: 3024
    }
  }

  goHD = () => {
    console.log('dasflkdaslkjdasjfk')
    console.log('dasflkdaslkjdasjfk')
    console.log('dasflkdaslkjdasjfk')
    window.location.href = 'https://www.lexiangpingou.cn/'
  }

  clearStorage = () => {
    localStorage.clear()
    window.location.reload()
  }

  render() {

    const alert = Modal.alert

    return (
      <BottomLogoStyled>
        <div>
          <div className="logo" style={{ textAlign: 'center', margin: '0 1rem', marginTop: '.4rem', marginBottom: '.2rem' }} onClick={this.goHD}>
            <div><img src={require('assets/img/LOGO.svg')} alt="火蝶云" /></div>
            <div className="logotext">
              <span style={{ fontSize: '.21rem', color: '#A9ABAE', letterSpacing: '.01rem' }}>火蝶云提供技术支持</span>
              <span style={{ fontSize: '.21rem', color: '#A9ABAE', }}>www.lexiangpingou.cn</span>
            </div>
          </div>
          <div style={{ height: '.2rem' }}>

          </div>

          {/* <div
            onClick={() =>
              alert('清空缓存', '', [
                { text: '确认', onPress: () => { this.clearStorage() } },
                { text: '取消', onPress: () => console.log('cancel') },
              ])
            }
            style={{ textAlign: "center", color: "#A9ABAE", letterSpacing: "0rem", opacity: '1', fontSize: '.21rem' }}>v3.0.2.6</div> */}
        </div>
      </BottomLogoStyled>
    )
  }

  componentDidMount() {
    localStorage.setItem('appVersion', JSON.stringify(this.state.version))
  }

}

const BottomLogoStyled = styled.div`

.logo {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.logo>div>img{
  width: .5rem;
  margin-right:.16rem;
}
.logo-logo{
  margin-top: .8rem;
}
.logotext{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: .25rem;
}

`

export default BottomLogo