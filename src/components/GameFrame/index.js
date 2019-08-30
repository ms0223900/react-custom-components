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

const usePopup = (init=false, setGameCoinFn) => {
  const [popup, setPopup] = useState(init)
  const [popupCnt, setCnt] = useState({})
  const open = useCallback((cnt) => {
    setCnt(cnt)
    setPopup(true)
    const { score } = cnt
    const coin = ~~(score / 100)
    if(coin >= 0) {
      setGameCoinFn(originCoin => parseInt(originCoin) + coin)
    }
  }, [popup])
  const close = useCallback(() => {
    setPopup(false)
  }, [popup])
  const toggle = useCallback(() => {
    setPopup(!popup)
  }, [popup])
  return [popup, open, close, toggle, popupCnt]
}


const GameFrame = ({ GameComponent, PopupComponent, resultNextFns=[], ...props }) => {
  const gameRef = useRef()
  const classes = useStyles_gameFrame()
  const [gameCoin, setGameCoin] = useState(parseInt(localStorage.getItem('gameCoin')) || 0)
  const [popup, open, close, toggle, popupCnt] = usePopup(false, setGameCoin)
  
  const handleOver = (resultContent) => {
    open(resultContent)
  }

  const handleNext = useCallback(() => {
    close()
    if(resultNextFns.length > 0) {
      resultNextFns.forEach(fn => fn())
      gameRef && gameRef.current.handleResetGame()
    } else {
      gameRef && gameRef.current.handleNext()
    }
  }, [resultNextFns])

  useEffect(() => {
    localStorage.setItem('gameCoin', gameCoin)
  }, [gameCoin])
  // console.log(popupCnt)
  //
  return (
    <Box className={ classes.root }>
      <Typography variant={'h5'}>{'game coin: ' + gameCoin }</Typography>
      {GameComponent && (
        <GameComponent 
          mainGameRef={ gameRef } 
          isOver={ popup } 
          overFn={ handleOver }
          {...props} />
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