import React, { useState, useEffect } from 'react'
import { Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
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

const getTime = (timeSec) => {
  const min = ~~(timeSec / 60)
  const sec = timeSec % 60
  return ({
    min: min < 10 ? '0' + min : min,
    sec: sec < 10 ? '0' + sec : sec
  })
}

const mockFn = () => {
  window.alert('time out!')
}

const Timer = ({ timeoutFn=mockFn, time=333, isPause }) => {
  const classes = useStyles()
  const [timeNow, setTimeNow] = useState(time)
  useEffect(() => {
    if(timeNow === 0) {
      timeoutFn()
      setTimeNow(time)
    }
    if(!isPause) {
      const newTime = timeNow - 1
      const timer = setTimeout(() => {
        setTimeNow(newTime)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [timeNow, isPause])
  //
  const { min, sec } = getTime(timeNow)
  return (
    <Paper className={ classes.root }>
      <Typography variant={ 'h5' }>
        { min + ':' + sec }
      </Typography>
    </Paper>
  )
}
export default Timer
