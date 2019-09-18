import React from 'react'
import { Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { getTime } from './fn'

const useStyles = makeStyles({
  root: {
    display: 'inline-block',
    width: 90,
    margin: 10,
    padding: 10,
    textAlign: 'center',
    '& h5': {
      fontWeight: 100,
      letterSpacing: 1,
    }
  }
})

const NormalTimerLayout = ({ timeNow }) => {
  const classes = useStyles()
  const { min, sec } = getTime(timeNow)
  return (
    <Paper className={ classes.root }>
      <Typography variant={ 'h5' }>
        { min + ':' + sec }
      </Typography>
    </Paper>
  )
}

export default NormalTimerLayout
