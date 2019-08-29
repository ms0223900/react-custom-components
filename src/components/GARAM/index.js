/* eslint-disable no-unused-vars */
import React, { useState, useCallback, forwardRef, useRef, useEffect } from 'react'
import {
  limitTimeModeTime,
  cellSize,
  getDifficultyEmptyBlocks,
  getDifficultyByLevel,
  getResultScoreStars,
} from './config'
import { Box, makeStyles, Paper, Button, Typography, Divider, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import Timer from '../Timer'
import GaramMainGame from './garamMainGame';

const {
  getSpeedModeResultContent,
  getResultContent,
  getMultiLevelResultStarContent
} = getResultScoreStars


const useStyles = makeStyles({
  root: {
    width: cellSize * 7,
    margin: 'auto',
    padding: 30,
    textAlign: 'center',
    backgroundColor: '#f2ffff',
  },
  gameHead: {
    minWidth: cellSize * 7 + 20,
    alignItems: 'center',
  },
  divider: {
    margin: '10px 0px',
    height: 1.5,
  },
  chooseDiff: {
    minWidth: 120,
  }
})

const DifficultySelects = ({ difficulty, changeFn }) => {
  const classes = useStyles()
  return (
    <FormControl className={ classes.chooseDiff }>
      <InputLabel htmlFor={'difficulty'}>{'difficulty'}</InputLabel>
      <Select 
      value={ difficulty }
      onChange={ changeFn }
      >
        <MenuItem value={'easy'}>{'easy'}</MenuItem>
        <MenuItem value={'medium'}>{'medium'}</MenuItem>
        <MenuItem value={'hard'}>{'hard'}</MenuItem>
      </Select>
    </FormControl>
    
  )
}


const GARAM = ({ 
  mainGameRef, 
  gameMode='speedMode', 
  level,
  overFn,
  setLevelDataFn, 
}, ref) => {
  const classes = useStyles()
  const timerRef = useRef()
  const [timerPause, setTimerPause] = useState(true)
  const [clearedLevel, setLevel] = useState(0)
  const [difficulty, setDiff] = useState('')
  
  const handleTimerOver = useCallback(() => {
    setTimerPause(true) //pause timer
    setLevel(0)
    gameMode === 'limitMode' && overFn( getResultContent(clearedLevel) )
    timerRef && timerRef.current.resetTimer()
  }, [gameMode, clearedLevel])

  const handleChange = e => {
    const { value } = e.target
    // console.log(value)
    setDiff(value)
  }

  const handleStart = useCallback(() => {
    if(!difficulty) {
      window.alert('choose difficulty first~')
    } else {
      setTimerPause(!timerPause)
    }
  }, [difficulty, timerPause])

  const handleGameOver = useCallback(() => {
    if(gameMode === 'speedMode' || gameMode === 'multiLevel') {
      const time = timerRef.current.getTimerTime()
      console.log(time)
      handleTimerOver()
      if(gameMode === 'multiLevel') {
        //set star result data 
        const result = getMultiLevelResultStarContent(difficulty, level, time)
        overFn(result)
        setLevelDataFn(result)
      } else {
        overFn( getSpeedModeResultContent(difficulty, time) )
      }
    } 
  }, [level, timerRef, gameMode])

  //multi level set difficulty by level
  useEffect(() => {
    if(typeof(level) === 'number') {
      const diff = getDifficultyByLevel(level)
      setDiff(diff)
    }
    timerRef && timerRef.current.resetTimer()
  }, [])

  //
  return (
    <Paper className={ classes.root }>
      {gameMode !== 'multiLevel' && (
        <DifficultySelects 
          difficulty={ difficulty }
          changeFn={ handleChange } />
      )}
      <Box>
        {gameMode === 'limitTime' ? (
          <Timer 
            ref={ timerRef }
            time={ limitTimeModeTime } 
            timeoutFn={ handleTimerOver } 
            isPause={ timerPause } />
        ) : (
          <Timer 
            ref={ timerRef }
            time={ 0 } 
            countDown={ false }
            // timeoutFn={ handleTimerOver } 
            isPause={ timerPause } />
        )}
        <Button onClick={ handleStart }>
          {timerPause ? 'Start' : 'Pause'}
        </Button>
        <Button onClick={ () => {
          timerRef.current.resetTimer()
        } }>{'reset'}</Button>
      </Box>

      {gameMode === 'limitTime' && (
        <Typography>{ 'level cleared: ' + clearedLevel }</Typography>
      )}
      {gameMode === 'multiLevel' && (
        <Typography>
          { 'level: ' + level }
        </Typography>
      )}
      <Divider className={ classes.divider } />

      <GaramMainGame 
        ref={ mainGameRef }
        gameMode={ gameMode }
        difficulty={ difficulty }
        timerPause={ timerPause }
        setClearedLevelFn={ setLevel }
        gameOverFn={ handleGameOver } />
    </Paper>
  )
}

// export default GARAM
export default forwardRef(GARAM) 

