/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Box, Paper, makeStyles, Typography, Button } from '@material-ui/core';
import { useStyles_gameFrame, useStyles_gameResultPopup } from './styles'


const GameResultPopup = ({ maxWidth=300, closeFn, nextFn, ...props }) => {
  const classes = useStyles_gameResultPopup({ maxWidth })
  return (
    <Box 
      display={ 'flex' } 
      className={ classes.root } 
      // onClick={ closeFn }
    >
      <Paper className={ classes.popup }>
        <Box className={ classes.closeBtn }>
          <span onClick={ closeFn }>{'x'}</span>
        </Box>
        {props.children}
        <Button onClick={ nextFn }>{ 'next' }</Button>
      </Paper>
    </Box>
  )
}

const usePopup = (init=false) => {
  const [popup, setPopup] = useState(init)
  const [popupCnt, setCnt] = useState({})
  const open = useCallback((cnt) => {
    setCnt(cnt)
    setPopup(true)
  }, [popup])
  const close = useCallback(() => {
    setPopup(false)
  }, [popup])
  const toggle = useCallback(() => {
    setPopup(!popup)
  }, [popup])
  return [popup, open, close, toggle, popupCnt]
}


const GameFrame = ({ GameComponent, PopupComponent }) => {
  const gameRef = useRef()
  const classes = useStyles_gameFrame()
  const [popup, open, close, toggle, popupCnt] = usePopup()
  const handleOver = (resultContent) => {
    open(resultContent)
  }
  const handleNext = () => {
    close()
    gameRef && gameRef.current.handleNext()
  }
  // console.log(popupCnt)
  //
  return (
    <Box className={ classes.root }>
      {GameComponent && (
        <GameComponent 
          mainGameRef={ gameRef } 
          isOver={ popup } 
          overFn={ handleOver } />
      )}
      {popup && (
        <GameResultPopup closeFn={ close } nextFn={ handleNext }>
          {PopupComponent && (
            <PopupComponent content={ popupCnt } />
          )}
        </GameResultPopup>
      )}
    </Box>
  )
}

export default GameFrame