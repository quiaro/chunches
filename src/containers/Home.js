import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import PublicHome from '../components/public/Home'

import { GC_USER_ID } from '../constants'

class Home extends Component {

  render() {
    const userId = localStorage.getItem(GC_USER_ID)

    return userId ? <Redirect to="/home"/> : <PublicHome />;
  }
}

export default Home;
