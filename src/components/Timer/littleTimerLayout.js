import React from 'react'
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { getTime } from './fn'

const useStyles = makeStyles({
  root: {
    display: 'inline-block',
  }
})

const LittleTimerLayout = ({ timeNow }) => {
  const classes = useStyles()
  const { min, sec } = getTime(timeNow)
  return (
    <Typography 
      className={ classes.root } 
      variant={ 'subtitle1' }
    >
      { `(${ min }:${ sec })` }
    </Typography>
  )
}

export default LittleTimerLayout
