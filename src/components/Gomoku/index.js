/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect } from 'react'
import { Button, Box, Paper, Typography, Container } from '@material-ui/core'
import Board from './board'
import Pieces from './pieces'
import { socket } from './API';
import { useStyles } from './styles'
import { handleAddInRoomAndSetReady } from './API'
import { piecesData_mockData } from './config'
import UserInfo from './userInfo'
import { useResetGame, useHandleSetData } from './hookFn';
import ChatRoom from './chat/chatRoom';

const FastMatch = ({ className, setDataFns }) => {
  const [setUserNow, setUserData, handleSetGameStart] = setDataFns
  return (
    <Paper className={ className }>
      <Typography variant={'h3'}>{'GOMOKU BATTLE'}</Typography>
      <Button 
        variant={ 'contained' } 
        color={ 'primary' } 
        onClick={ () => handleAddInRoomAndSetReady(setUserNow, setUserData, handleSetGameStart) }
      >
        { 'fast match' }
      </Button>
    </Paper>
  )
}

const App = () => {
  const classes = useStyles()
  const [pieceData, setData] = useState(piecesData_mockData)
  const [userData, setUserData] = useState(null)
  const [userNow, setUserNow] = useState(null)
  const [playerNow, setPlayerNow] = useState('Player01')
  const [gameStart, setGameStart] = useState(false)
  //
  const leaveGame = useCallback((userNow) => {
    const { roomId } = userData[0]
    const confirmMes = 'Are your sure leaving the game?'
    if(window.confirm(confirmMes)) {
      socket.emit('leave', {
        userNow,
        roomId,
      })
      resetGame(false)
    }
  }, [userData])
  const resetGame = useResetGame(userData, setData, setUserData, setUserNow, setGameStart)
  const handleSetData = useHandleSetData(userData, userNow, pieceData, setData, setPlayerNow, resetGame)
  //
  const handleSetGameStart = () => {
    socket.emit('set_game', true)
    // setGameStart(true)
  }
  //
  useEffect(() => {
    console.log('register socket')
    //socket listen
    socket.on('get_game', res => {
      console.log('get_game', res)
      setGameStart(res)
      //reset game 
      !res && resetGame(false)
    })
    socket.on('get_message', res => {
      window.alert(res)
    })
  }, [])
  //
  useEffect(() => {
    window.onbeforeunload = function() {
      // return ''
    }
    return () => {
      window.onbeforeunload = null
    }
  }, [gameStart])
  useEffect(() => {
    if(userData) {
      setPlayerNow(userData[0].username)
      socket.on('get_piece', res => {
        setPlayerNow(res.nextPlayer)
        setData(res.data)
        res.winner && resetGame(res.winner)
      })
    }
  }, [userData])
  //
  const isWaiting = userNow && !gameStart
  console.log(userNow, gameStart)
  return (
    <div>
      {gameStart && (
        <Container>
          <UserInfo 
            userNow={ userNow }
            playerNow={ playerNow }
            userData={ userData } 
          />
            <Box display={ 'flex' } className={ classes.gameMainPart }>
              <Board>
                <Pieces setPiece={ playerNow === userNow && handleSetData }  pieceData={ pieceData } />
              </Board>
              <Button onClick={ leaveGame.bind(this, userNow) }>{ 'exit game' }</Button>
              <ChatRoom 
                userData={ userData }
                userNow={ userNow }  />
            </Box>
        </Container>
      )}
      {isWaiting && (
        <Typography variant={ 'h5' }>
          { 'waiting for another player...' }
        </Typography>
      )}
      {!gameStart && (
        <FastMatch 
          className={ classes.matchPart }
          setDataFns={ [setUserNow, setUserData, handleSetGameStart] }  />
      )}
    </div>
  )
}

export default App

