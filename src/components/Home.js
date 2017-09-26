import React from 'react'

import HomePrivate from './HomePrivate'
import HomePublic from './HomePublic'
import { isLoggedIn } from '../common/AuthService';

const Home = () => {

  return (
      isLoggedIn() ? (
        <HomePrivate></HomePrivate>
      ) : (
        <HomePublic></HomePublic>
      )
  )
}

export default Home
