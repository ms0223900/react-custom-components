/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from 'react'
import { Button } from '@material-ui/core'
import { LOG_IN_STATUS } from './config'
import { logInAndSetInfo } from '../GameFrame/API'

const user_defaultUser = {
  username: 'aaa',
  pwd: 'aaaaaaaa'
}
const removeUserInfo = () => {
  localStorage.removeItem('USER_NAME')
  localStorage.removeItem('USER_ID')
  localStorage.removeItem('jwt')
}

const LoginButton = () => {
  const isAuth = localStorage.getItem('USER_NAME') && localStorage.getItem('jwt')
  const handleLogin = useCallback(() => {
    if(!isAuth) {
      logInAndSetInfo(user_defaultUser.username, user_defaultUser.pwd, () => null, () => location.reload())
    } else {
      removeUserInfo()
      location.reload()
    }
  }, [isAuth])
  const username = localStorage.getItem('USER_NAME')
  return (
    <Button onClick={ handleLogin } variant={'contained'}>
      {!isAuth ? 'click to log in' : `hi: ${username}, log out`}
    </Button>
  )
}

export default LoginButton