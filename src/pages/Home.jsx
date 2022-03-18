import React, { Fragment, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// eslint-disable-next-line import/named
import { News, Slider, Footer, Activity, Header } from 'components/layout'

const Home = () => {
  const authLogin = JSON.parse(localStorage.getItem('authLogin'))
  useEffect(() => {
    if (authLogin) {
      if (authLogin.user.role === 'admin') window.location = '/dashboard'
    }
  }, [authLogin])
  return (
    <Fragment>
      <Header />
      <Slider />
      <News />
      <Activity />
      <Footer />
    </Fragment>
  )
}

export default Home
