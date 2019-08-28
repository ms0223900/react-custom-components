/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect, forwardRef, useRef } from 'react'
import {
  cellSize,
  getDifficultyEmptyBlocks,
} from './config'
import { Box, makeStyles, Paper, Button, Typography, Divider } from '@material-ui/core';
import { getNumbersData, checkAnswer } from './fn'
import SingleBlockItem from './singleBlockItem';
import SingleOperationItem from './singleOperationItem';
import Timer from '../Timer'
import GaramMainGame from './garamMainGame';
// console.log(getRandomNumberAndGetRandomFac(nums))

const GaramHead = ({ classes, difficulty, setDiff }) => (
  <Box display={ 'flex' } className={ classes.gameHead }>
    <Box>
      <Typography variant={ 'h4' }>{ 'GARAM' }</Typography>
      <Typography variant={ 'subtitle1' }>{ 'difficulty: ' + difficulty }</Typography>
    </Box>
    <Box>
      <Button 
        variant={ 'contained' }
        color={ difficulty === 'easy' ? 'primary' : 'default' }
        onClick={ () => setDiff('easy') }>{ 'easy' }</Button>
      <Button 
        variant={ 'contained' }
        color={ difficulty === 'medium' ? 'primary' : 'default' }
        onClick={ () => setDiff('medium') }>{ 'medium' }</Button>
      <Button 
        variant={ 'contained' }
        color={ difficulty === 'hard' ? 'primary' : 'default' }
        onClick={ () => setDiff('hard') }>{ 'hard' }</Button>
    </Box>
  </Box>
)


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
})

const getSpeedModeResultContent = (difficulty, time) => {
  const difficultyWeight = getDifficultyEmptyBlocks(difficulty)
  const score = difficultyWeight * (difficultyWeight * 3 - time) * 100
  return ({
    level: 'no',
    score,
  })
}

const getResultContent = (level=0) => ({
  level,
  score: level * 1000,
})


const GARAM = ({ overFn, isOver, mainGameRef, gameMode='speedMode' }, ref) => {
  const classes = useStyles()
  const timerRef = useRef()
  // const [gameMode] = useState('limitTime')
  const [timerPause, setTimerPause] = useState(true)
  const [clearedLevel, setLevel] = useState(0)
  const [difficulty, setDiff] = useState('easy')
  const handleTimerOver = useCallback(() => {
    setTimerPause(true) //pause timer
    setLevel(0)
    gameMode === 'limitMode' && overFn( getResultContent(clearedLevel) )
    timerRef && timerRef.current.resetTimer()
  }, [gameMode, clearedLevel])

  const handleSpeedModeGameOver = useCallback(() => {
    const time = timerRef.current.getTimerTime()
    console.log(time)
    overFn( getSpeedModeResultContent(difficulty, time) )
    handleTimerOver()
  }, [timerRef, difficulty])

  //
  return (
    <Paper className={ classes.root }>
      {gameMode === 'limitTime' ? (
        <Timer 
          ref={ timerRef }
          time={ 3 } 
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
      <Button onClick={() => setTimerPause(!timerPause)}>
        {timerPause ? 'Start' : 'Pause'}
      </Button>
      {/* <Button onClick={() => {
        console.log(timerRef.current)
        const time = timerRef.current.getTimerTime()
        window.alert(time)
      }}>{'getTime'}</Button> */}
      <Button onClick={ () => {
        timerRef.current.resetTimer()
      } }>{'reset'}</Button>
      {/* <GaramHead 
        classes={ classes } 
        difficulty={ difficulty } 
        setDiff={ setDiff } /> */}
      <Typography>{ 'level cleared: ' + clearedLevel }</Typography>
      <Divider className={ classes.divider } />
      <GaramMainGame 
        ref={ mainGameRef }
        gameMode={ gameMode }
        timerPause={ timerPause }
        setClearedLevelFn={ setLevel }
        gameOverFn={ handleSpeedModeGameOver } />
    </Paper>
  )
}

// export default GARAM
export default forwardRef(GARAM) 

