import React from 'react'

import HomePrivate from './HomePrivate'
import HomePublic from './HomePublic'
import { isLoggedIn } from '../utils/AuthService';

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
