import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  score: {
    fontWeight: 800,
  }
})

const GameText = ({ title='score', text }) => {
  const classes = useStyles()
  return (
    <Box>
      <Typography variant={ 'subtitle1' }>
        { title }
      </Typography>
      <Typography 
        className={ classes.score } 
        variant={ 'h4' } 
      >
        { text }
      </Typography>
    </Box>
  )
}

export default GameText