/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react'
// eslint-disable-next-line no-unused-vars
import { Route } from 'react-router-dom'
import { Typography, CircularProgress, Box } from '@material-ui/core'
import defaultPage from './DefaultPage'
import { loggedUser, LOG_IN_STATUS } from './config'
import { apiUrl } from '../GameFrame/API'
import LoginButton from './LoginButton'
import ContextStore from '../GameFrame/context'
const { LOGGED_OUT, LOGGED_IN, AUTHORIZING } = LOG_IN_STATUS

const timeoutPromise_mockApi = (time=1000) => (
  new Promise(res => {
    setTimeout(() => {
      const result = localStorage.getItem(loggedUser)
      res(result)
    }, time)
  })
)

const getJWTFromLocalStorage = () => {
  const jwt = localStorage.getItem('jwt')
  const userId = localStorage.getItem('USER_ID')
  return jwt ? {
    jwt: jwt.replace(/"|'/g, ''),
    userId,
  } : {
    jwt,
    userId
  }
}

const getUserFromJWT = () => {
  const { jwt, userId } = getJWTFromLocalStorage()
  return fetch(`${apiUrl}users/${userId}`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
    .then(res => {
      return res.json()
    })
    .then(res => {
      return res
    })
}


const getAuthStatus = async (setAuthFn, setUserInfoFn) => {
  const result = await getUserFromJWT()
  if(result.statusCode === 401) {
    return setAuthFn(LOGGED_OUT)
  } else {
    setUserInfoFn(result)
    return setAuthFn(LOGGED_IN)
  }
}


const LoadingAuthPage = () => {
  return (
    <Box>
      <CircularProgress />
      { 'wait for authorization...' }
    </Box>
  )
}

const NotLoggedIn = () => {
  return (
    <Typography>
      { 'please log in :))' }
    </Typography>
  )
}

const AllPages = ({ PageComponent, loggedStatus, isAuth, ...props }) => {
  switch (loggedStatus) {
  case LOGGED_OUT:
    return <NotLoggedIn />
  case LOGGED_IN:
    return <PageComponent {...props} isAuth={ isAuth } />
  case AUTHORIZING:
    return <LoadingAuthPage />
  default:
    return <LoadingAuthPage />
  }
}

const protectedPage = Page => ({ ...passedProps }) => {
  const { setUserInfo } = useContext(ContextStore)
  const [loggedStatus, setLogged] = useState(AUTHORIZING)
  useEffect(() => {
    getAuthStatus(setLogged, setUserInfo)
  }, [])
  const isAuth = loggedStatus === LOGGED_IN
  return (
    <>
      <LoginButton isAuth={isAuth} />
      <AllPages 
        {...passedProps}
        loggedStatus={loggedStatus} 
        isAuth={isAuth}
        PageComponent={Page} />
    </>
  )
}

export default Page => protectedPage(defaultPage(Page))