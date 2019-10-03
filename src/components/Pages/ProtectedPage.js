import React from 'react'
// eslint-disable-next-line no-unused-vars
import { Route } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import defaultPage from './DefaultPage'

const NotAuthPage = () => {
  return (
    <Typography>
      {'not logged in :('}
    </Typography>
  )
}

const protectedPage = Page => ({ ...passedProps }) => {
  const isAuth = !!localStorage.getItem('logged-user')
  return (
    <>
      {isAuth ? (
        <Page {...passedProps} />
      ) : (
        <NotAuthPage />
      )}
    </>
  )
}

export default Page => protectedPage(defaultPage(Page))