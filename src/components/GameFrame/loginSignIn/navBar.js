/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react'
import { Container, Box, makeStyles, Button, Typography } from '@material-ui/core';
import { QUERY_USER, QUERY_USERS } from '../API'
import ContextStore from '../context'
import SignUp from './signUp';
import LogIn from './logIn'
import UserInfo from './userInfo';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';

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

const NavBar = ({ userInfo, setUserInfo }) => {
  const { loading, data } = useQuery(QUERY_USERS, {
    variables: {
      userWhere: {
        username: localStorage.getItem('username') || ''
      }
    }
  })
  const classes = useStyles()
  const {
    id,
    username,
    point,
    rank,
    isLoggedIn,
  } = userInfo
  const [signUp, setSignUp] = useState(false)
  const [login, setLogin] = useState(false)
  // const [username, setUsername] = useState(null)
  const handleClose = () => {
    setSignUp(false)
    setLogin(false)
  }
  const handleLogOut = () => {
    // setUsername(null)
    localStorage.removeItem('username')
    setUserInfo({
      ...userInfo,
      isLoggedIn: false,
    })
  }
  //query latest information from username
  useEffect(() => {
    console.log(data)
    if(data && data.users && data.users.length > 0) {
      setUserInfo({
        ...data.users[0],
        isLoggedIn: true,
      })
    }
  }, [data])
  return (
    <Container>
      <Box display={ 'flex' } className={ classes.root }>
        {loading && 'loading...'}
        {!isLoggedIn && (
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
        {isLoggedIn && (
          <>
            <Box className={ classes.username } >
              <Typography variant={ 'h5' }>
                { username }
              </Typography>
              <UserInfo userInfo={ userInfo } />
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
            <SignUp 
              setUserInfo={ setUserInfo }
              closeFn={ handleClose } />
          )}
          {login && (
            <LogIn 
              setUserInfo={ setUserInfo }
              closeFn={ handleClose } />
          )}
        </Box>
      )}
    </Container>
  )
}
export default () => {
  const { userInfo, setUserInfo } = useContext(ContextStore)
  return (
    <NavBar 
      userInfo={ userInfo }
      setUserInfo={ setUserInfo } />
  )
}