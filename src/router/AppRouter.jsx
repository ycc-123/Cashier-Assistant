import React from 'react'
import { HashRouter as Router, Redirect } from 'react-router-dom'
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'

import Home from 'views/home/Home'
import Baobiao from 'views/baobiao/Baobiao'
import My from 'views/my/My'

const AppRouter = () => {
  return (
    <Router> 
      <CacheSwitch>
        {/* <Route path='/cart' exact component={Cart}></Route> */}
        {/* 精确匹配  总是 */}
        <CacheRoute path='/home' exact when='forward' component={Home} cacheKey='HomeComponent'></CacheRoute>
        <CacheRoute path="/Baobiao" exact when='always' component={Baobiao}></CacheRoute>
        <CacheRoute path='/My' when='always' component={My} ></CacheRoute>
        <Redirect from='/' exact to='/home'></Redirect>
      </CacheSwitch>



    </Router>
  )
}

export default AppRouter
