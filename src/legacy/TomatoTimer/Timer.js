import React, { useState, useEffect } from 'react'
import { Paper, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import { getMinSec } from './fn'

const useStyle = makeStyles({
  root: {
    maxWidth: 300,
    margin: 'auto',
    padding: 10,
    textAlign: 'center',
    '& h2': {
      fontWeight: 600,
    }
  }
})


const Timer = ({ totalTime=10, isPause=false, setPausePlay, workOrBreak, setWorkBreak }) => {
  const classes = useStyle()
  const [timePassed, setTime] = useState(totalTime)
  useEffect(() => {
    let timer
    document.title = `(${ getMinSec(timePassed).min } : ${ getMinSec(timePassed).sec })`
    if(timePassed === 0) {
      setTimeout(() => {
        setWorkBreak()
      }, 1000)
    } else {
      timer =  !isPause && setInterval(() => {
        setTime(timePassed - 1)
      }, 1000)
    }
    return () => { clearInterval(timer) }
  }, [timePassed, isPause])
  useEffect(() => {
    setTime(totalTime)
  }, [workOrBreak, totalTime])
  //
  return (
    <Paper className={ classes.root }>
      <Typography variant={ 'h4' }>{ workOrBreak + 'ing~' }</Typography>
      <Typography variant={ 'h2' }>
        { `${ getMinSec(timePassed).min } : ${ getMinSec(timePassed).sec }` }
      </Typography>
      <Button 
        color={ isPause ? 'primary' : 'default' }
        variant={ 'contained' } 
        onClick={ setPausePlay }
      >
        { isPause ? 'start' : 'pause' }
      </Button>
      <Button onClick={ () => setTime(totalTime) }>{ 'reset' }</Button>
    </Paper>
  )
}

export default Timer