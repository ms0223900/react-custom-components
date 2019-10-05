import React from 'react'
import { Link } from 'react-router-dom'
import { Box, makeStyles, Button } from '@material-ui/core'
import LoginButton from '../components/Pages/LoginButton'

const useStyles = makeStyles({
  root: {
    backgroundColor: '#ddd',
    padding: 10
  },
})

const NavBar = () => {
  const classes = useStyles()
  return (
    <Box className={classes.root} display={'flex'}>
      <Box>
        <Button>
          <Link to={'/'}>{'Home'}</Link>
        </Button>
        <Button>
          <Link to={'/user'}>{'My Page'}</Link>
        </Button>
      </Box>
      <LoginButton />
    </Box>
  )
}

export default NavBar