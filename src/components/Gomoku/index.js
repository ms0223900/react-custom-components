/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Typography } from '@material-ui/core'
import { socket, getSpecificGomokuRoom } from './API';
import { useStyles } from './styles'
import { piecesData_mockData, singlePlayerUsername } from './config'
import { useResetGame, useHandleSetData } from './hookFn';
import { randomPiece } from './fn'
import { aiRival } from './pcAI';
import NavBar from './loginSignIn/navBar';
import GameMainPart from './components/gameMainPart'
import FastMatch from './components/fastMatch'

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
    if(userData) {
      const { roomId } = userData[0]
      roomId !== 'single play' && 
      getSpecificGomokuRoom(roomId)
        .then(res => {
          const { user1, user2 } = res
          setUserData([
            { username: user1, color: 'black', roomId, },
            { username: user2, color: 'white', roomId, },
          ])
        })
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
    <div style={{ marginTop: 60, }}>
      {gameStart && (
        <GameMainPart 
          classes={ classes }
          userNow={ userNow }
          playerNow={ playerNow }
          userData={ userData }
          timerRef={ timerRef }
          handleSetRandomPiece={ handleSetRandomPiece }
          handleSetData={ handleSetData }
          pieceData={ pieceData }
          leaveGame={ leaveGame }
        />
      )}
      {isWaiting && (
        <Typography variant={ 'h5' }>
          { 'waiting for another player...' }
        </Typography>
      )}
      {!gameStart && (
        <FastMatch 
          className={ classes.matchPart }
          setDataFns={ [setUserNow, setUserData, handleSetGameStart] }
          setSinglePlayFn={ handleSetSinglePlay }  
        />
      )}
      <NavBar />
    </div>
  )
}

export default App

