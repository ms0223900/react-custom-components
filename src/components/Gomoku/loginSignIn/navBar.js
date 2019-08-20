import React, { useState, useEffect } from 'react'
import { Container, Box, makeStyles, Button, Typography } from '@material-ui/core';
import SignUp from './signUp';
import LogIn from './logIn'
import UserInfo from './userInfo';

const useStyles = makeStyles({
  root: {
    // height: 60,
    position: 'fixed',
    justifyContent: 'flex-end',
    top: 0,
    left: 0,
    width: '100%',
    height: 48,
    backgroundColor: '#ddd',
    '& h5': {
      padding: 6,
    }
  },
  back: {
    position: 'fixed',
    top: 48,
    left: 0,
    width: '100%',
    height: '100vh'
    // opacity: 0.3,
  },
  backBG: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    margin: 'auto',
    backgroundColor: '#ddd',
    opacity: 0.6
  },
  username: {
    // cursor: 'pointer',
    // '&:hover': {
    //   '& div': {
    //     left: 0,
    //     transition: 'opacity 0.3s',
    //     opacity: 1,
    //   }
    // },
    // '& div': {
    //   cursor: 'default',
    //   position: 'relative',
    //   left: -10000,
    //   transition: 'opacity 0.3s',
    //   opacity: 0,
    // }
  }
})

const NavBar = () => {
  const classes = useStyles()
  const [signUp, setSignUp] = useState(false)
  const [login, setLogin] = useState(false)
  const [username, setUsername] = useState(null)
  const handleClose = () => {
    setSignUp(false)
    setLogin(false)
  }
  const handleLogOut = () => {
    setUsername(null)
    localStorage.removeItem('userDBid')
    localStorage.removeItem('username')
    localStorage.removeItem('point')
    localStorage.removeItem('rank')
  }
  useEffect(() => {
    const username = localStorage.getItem('username')
    username && setUsername(username)
  }, [])
  return (
    <Container>
      <Box display={ 'flex' } className={ classes.root }>
        {!username && (
          <>
            <Button 
              onClick={ () => setSignUp(!signUp)}
            >
              { 'sign up' }
            </Button>
            <Button 
              onClick={ () => setLogin(!login)}
            >
              { 'log in' }
            </Button>
          </>
        )}
        {username && (
          <>
            <Box className={ classes.username } >
              <Typography 
                
                variant={ 'h5' }>{ username }</Typography>
              <UserInfo />
            </Box>
            <Button onClick={ handleLogOut }>{ 'log out' }</Button>
          </>
        )}
      </Box>
      {(signUp || login) && (
        <Box 
          className={ classes.back }
        >
          <Box className={ classes.backBG } onClick={ handleClose } />
          {signUp && (
            <SignUp />
          )}
          {login && (
            <LogIn />
          )}
        </Box>
      )}
    </Container>
  )
}
export default NavBar