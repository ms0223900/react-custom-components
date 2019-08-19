/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Button, Box, Paper, Typography, Container } from '@material-ui/core'
import Board from './board'
import Pieces from './pieces'
import { socket } from './API';
import { useStyles } from './styles'
import { handleAddInRoomAndSetReady } from './API'
import { piecesData_mockData, singlePlayerUsername } from './config'
import UserInfo from './userInfo'
import { useResetGame, useHandleSetData } from './hookFn';
import ChatRoom from './chat/chatRoom';
import { randomPiece } from './fn'
import Timer from '../Timer';
import { aiRival } from './pcAI';

const FastMatch = ({ className, setDataFns, setSinglePlayFn }) => {
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
      <Button onClick={ setSinglePlayFn }>
        { 'Single Play' }
      </Button>
    </Paper>
  )
}

const App = () => {
  const classes = useStyles()
  const timerRef = useRef()
  // const [pieceInfo, setPieceInfo] = useState(null)
  const [pieceData, setData] = useState(piecesData_mockData)
  const [userData, setUserData] = useState(null)
  const [userNow, setUserNow] = useState(null)
  const [playerNow, setPlayerNow] = useState('Player01')
  const [gameStart, setGameStart] = useState(false)
  const [isSinglePlay, setSinglePlay] = useState(false)
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
  const resetGame = useResetGame(userData, setGameStart)
  const handleSetData = useHandleSetData(userData, userNow, pieceData, setData, setPlayerNow, resetGame)
  const handleSetData_pc = useHandleSetData(userData, 'PC', pieceData, setData, setPlayerNow, resetGame)
  const handleSetRandomPiece = () => {
    window.alert('time out!')
    const randomPieceId = randomPiece(pieceData)
    handleSetData(randomPieceId)
  }
  //
  const handleSetGameStart = () => {
    socket.emit('set_game', true)
    // setGameStart(true)
  }
  const handleSetSinglePlay = () => {
    const username = singlePlayerUsername
    setGameStart(true)
    setUserData([
      { username, color: 'black', roomId: 'single play' },
      { username: 'PC', color: 'white', roomId: 'single play' },
    ])
    setPlayerNow(username)
    setUserNow(username)
    setSinglePlay(true)
  }
  //
  useEffect(() => {
    console.log('register socket')
    //socket listen
    socket.on('get_game', res => {
      console.log('get_game', res)
      setGameStart(res)
      console.log('clearTimeout')
      socket.emit('clear_timeout')
      //reset game 
      if(!res) {
        resetGame(false)
        socket.emit('leave', false)
      }
    })
    socket.on('get_message', res => {
      window.alert(res)
    })
    return () => {
      socket.removeAllListeners()
    }
  }, [])
  //
  useEffect(() => {
    if(!gameStart) {
      setData(piecesData_mockData);
      setUserData(null);
      setUserNow(null);
    }
  }, [gameStart])
  useEffect(() => {
    if(userData && userNow) {
      setPlayerNow(userData[0].username)
      socket.on('get_piece', res => {
        setPlayerNow(res.nextPlayer)
        setData(res.data)
        res.winner && resetGame(userNow, res.winner)
      })
    }
  }, [userData, userNow])
  useEffect(() => {
    if(isSinglePlay) {
      if(playerNow !== singlePlayerUsername) {
        const pcId = aiRival(pieceData, userNow, 'black')
        console.log(pcId)
        handleSetData_pc(pcId)
      }
    }
    timerRef.current && timerRef.current.resetTimer()
  }, [pieceData])
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
          <Timer 
            ref={ timerRef }
            time={ 2000 } 
            timeoutFn={ handleSetRandomPiece } 
            isPause={ playerNow !== userNow }
          />
            <Box display={ 'flex' } className={ classes.gameMainPart }>
              <Board>
                <Pieces 
                  // setPieceInfo={ setPieceInfo }
                  setPiece={ playerNow === userNow && handleSetData }
                  pieceData={ pieceData } />
              </Board>
              <ChatRoom 
                userData={ userData }
                userNow={ userNow }
              >
                <Button 
                  onClick={ leaveGame.bind(this, userNow) }
                >
                  { 'exit game' }
                </Button>
                <Button onClick={ handleSetRandomPiece }>
                  { 'set random piece' }
                </Button>
              </ChatRoom>
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
          setDataFns={ [setUserNow, setUserData, handleSetGameStart] }setSinglePlayFn={ handleSetSinglePlay }  
        />
      )}
    </div>
  )
}

export default App

