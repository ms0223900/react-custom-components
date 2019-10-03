import React, { useState, useCallback } from 'react'
import { Button } from '@material-ui/core'

const loggedUser = 'logged-user'
const LoginButton = () => {
  const isLogged = localStorage.getItem(loggedUser)
  const [logged, setLog] = useState(isLogged)
  const handleLogin = useCallback(() => {
    if(!logged) {
      localStorage.setItem(loggedUser, 'hi')
    } else {
      localStorage.removeItem(loggedUser)
    }

    location.reload()
  }, [logged])
  return (
    <Button onClick={ handleLogin }>
      {!logged ? 'log in' : 'log out'}
    </Button>
  )
}

export default LoginButton