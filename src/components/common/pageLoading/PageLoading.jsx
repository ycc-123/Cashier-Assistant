import React, { Component, Fragment } from 'react'


class PageLoading extends Component {
  render() {
    const showLoding = this.props.loading ? 'block' : 'none'
    return (
      <Fragment>
        <div className='home-loadingBg' style={{ display: showLoding }}>
          <div className='home-loading-img'>
            <img src={require('assets/img/loading.png')} alt="" />
          </div>
        </div>
      </Fragment>
    )
  }
}

export default PageLoading;