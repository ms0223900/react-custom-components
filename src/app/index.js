/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import TestLogin from './testLogin'
import { Container, Box } from '@material-ui/core'
import HomePage from './homePage'
import NavBar from './navBar'

export default () => {
  return (
    <Router>
      <NavBar />
      <Box style={{ padding: 20 }}>
        <Route path={'/'} exact render={() => (
          <HomePage />
        )} />
        <Route path={'/user'} exact render={() => (
          <TestLogin />
        )} />
      </Box>
    </Router>
  )
}