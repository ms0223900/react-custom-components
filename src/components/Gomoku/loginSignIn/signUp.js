import React, { useState, useCallback } from 'react'
import { TextField, Paper, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { singUp } from '../API'


const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 120,
    right: 0,
    left: 0,
    padding: 10,
    maxWidth: 300,
    height: 230,
    margin: 'auto',
    textAlign: 'center',
    
    '& .MuiTextField-root': {
      display: 'block',
      margin: 10,
    }
  }
})

const SignUp = () => {
  const classes = useStyles()
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: ''
  })
  const [error, setErr] = useState(null)
  //
  const handleChange = useCallback(e => {
    const { id, value } = e.target
    // console.log(id, value)
    setForm({
      ...form,
      [id]: value,
    })
  }, [form])
  const handleSignUp = useCallback(() => {
    const { email, username, password } = form
    singUp(username, email, password, setErr)
  }, [form, setErr])
  return (
    <Paper className={ classes.root }>
      <Typography variant={'subtitle1'}>{ 'Sign UP' }</Typography>
      <form onChange={ handleChange }>
        <TextField 
          id={ 'email' }
          margin="normal"
          value={ form.email  }
          autoComplete={ 'email' } 
          placeholder={ 'email' } />
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
      <Button variant={'contained'} onClick={ handleSignUp }>
        { 'Sign Up' }
      </Button>
      <Typography color={ 'error' }>{ error }</Typography>
    </Paper>
  )
}
export default SignUp