/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useRef, useEffect, useContext } from 'react'
import { Box, Paper, makeStyles, Typography, Button } from '@material-ui/core';
import { useStyles_gameFrame, useStyles_gameResultPopup } from './styles'
import './style/style.scss'
import ContextStore from './context';
import { addStats } from './actionsAndReducers/actions';

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

const GameResultPopup = ({ maxWidth=300, closeFn, nextFn, retryFn, ...props }) => {
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
        <Box>
          <Button onClick={ retryFn }>{ 'retry' }</Button>
          <Button onClick={ nextFn }>{ 'next' }</Button>
        </Box>
        
      </Paper>
    </Box>
  )
}


const GameFrame = ({ 
  GameComponent, 
  PopupComponent, 
  closeFn,
  gameOverFns=[],
  resultNextFns=[], 
  ...props 
}) => {
  const { dispatch } = useContext(ContextStore)
  const gameRef = useRef()
  const gameContainerRef = useRef()
  const classes = useStyles_gameFrame()
  const [gameCoin, setGameCoin] = useState(parseInt(localStorage.getItem('gameCoin')) || 0)
  const [popup, open, close, toggle, popupCnt] = usePopup(false, setGameCoin)
  
  const handleOver = (resultContent={}) => {
    open(resultContent)
    const resultKeys = Object.keys(resultContent)
    dispatch && resultKeys.forEach(key => {
      dispatch( addStats(key, resultContent[key]) )
    })
    if(gameOverFns.length > 0) {
      gameOverFns.forEach(fn => fn(resultContent))
      gameRef && gameRef.current.handleResetGame()
    }
  }

  const handleNext = useCallback(() => {
    // close()
    if(resultNextFns.length > 0) {
      resultNextFns.forEach(fn => fn())
      gameRef && gameRef.current.handleResetGame()
    } else {
      gameRef && gameRef.current.handleNext()
    }
  }, [resultNextFns])

  const handleClose = useCallback(() => {
    close()
    closeFn && closeFn()
  }, [closeFn])

  const handleRetry = () => {
    gameRef && gameRef.current.handleResetGame()
    gameContainerRef && gameContainerRef.current.startGame()
    close()
  }

  useEffect(() => {
    localStorage.setItem('gameCoin', gameCoin)
  }, [gameCoin])
  // console.log(popupCnt)
  //
  return (
    <Box className={ classes.root }>
      {/* <Typography variant={'h5'}>
        {'game coin: ' + gameCoin }
      </Typography> */}
      {GameComponent && (
        <GameComponent 
          ref={ gameContainerRef }
          mainGameRef={ gameRef } 
          isOver={ popup } 
          overFn={ handleOver }
          {...props} />
      )}
      {popup && (
        <GameResultPopup 
          closeFn={ handleClose } 
          nextFn={ handleNext }
          retryFn={ handleRetry }
        >
          {PopupComponent && (
            <PopupComponent content={ popupCnt } />
          )}
        </GameResultPopup>
      )}
    </Box>
  )
}

export default GameFrame