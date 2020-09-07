import React, { Component} from 'react'
import { withRouter } from 'react-router-dom'


import TabBar from 'common/tabBar/TabBar'




import './style/home.css'



class Home extends Component {

  render() {



    return (
      <div>
        
          <TabBar/>
      </div>

    )
  }
 




   


}

export default withRouter(Home)