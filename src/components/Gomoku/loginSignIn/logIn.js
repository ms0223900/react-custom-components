import React, { useState, useCallback } from 'react'
import { TextField, Paper, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { logIn } from '../API'


const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 120,
    // bottom: 0,
    right: 0,
    left: 0,
    padding: 10,
    maxWidth: 300,
    height: 180,
    margin: 'auto',
    textAlign: 'center',
    '& .MuiTextField-root': {
      display: 'block',
      margin: 10,
    }
  }
})

const LogIn = () => {
  const classes = useStyles()
  const [form, setForm] = useState({
    username: '',
    password: ''
  })
  const [error, setErr] = useState(null)
  const handleChange = useCallback(e => {
    const { id, value } = e.target
    // console.log(id, value)
    setForm({
      ...form,
      [id]: value,
    })
  }, [form])
  const handleLogIn = useCallback(() => {
    const { username, password } = form
    logIn(username, password, setErr)
  }, [form, setErr])
  //
  return (
    <Paper className={ classes.root }>
      <Typography variant={'subtitle1'}>{ 'Log In' }</Typography>
      <form onChange={ handleChange }>
        <TextField 
          id={ 'username' }
          margin="normal"
          value={ form.username  }
          placeholder={ 'username' } />
        <TextField 
          id={ 'password' }
          margin="normal"
          value={ form.password  }
          type={ 'password' } 
          placeholder={ 'password' } />
      </form>
      <Button variant={'contained'} onClick={ handleLogIn }>
        { 'Log In' }
      </Button>
      <Typography color={ 'error' }>{ error }</Typography>
    </Paper>
  )
}
export default LogIn