/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect } from 'react'
import { Button, Box, Paper, Typography } from '@material-ui/core'
import Board from './board'
import Pieces from './pieces'
import { checkWhoWin } from './fn'
import { socket } from './API';
import { useStyles } from './styles'
import { updateGomokuRoomState, handleAddInRoomAndSetReady } from './API'
import { piecesData_mockData, userData_mockData } from './config'
import UserInfo from './userInfo'

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

  const resetGame = useCallback(winner => {
    if(winner) {
      console.log(winner, userData)
      winner && window.alert(`winner is ${ winner}`)
    }
    //clear room data 
    if(userData) {
      const { roomId } = userData[0]
      updateGomokuRoomState(roomId)
    }
    setData(piecesData_mockData)
    setUserData(null)
    setUserNow(null)
    setGameStart(false)
  }, [userNow, userData])
  //
  const handleSetGameStart = () => {
    socket.emit('set_game', true)
    setGameStart(true)
  }
  const handleSetData = useCallback((id) => {
    const userDataNow = userData.find(data => data.username === userNow)
    const pieceColor = userDataNow.color
    const newPieceData = [...pieceData]
    if(!newPieceData[id].pieceColor) { //if not be set piece
      newPieceData[id] = {
        user: userNow,
        pieceId: id,
        pieceColor,
      }
      setData(newPieceData)
      //
      const winner = checkWhoWin(newPieceData, userNow)
      const nextPlayer = 
        !winner && userNow === userData[0].username ? userData[1].username : userData[0].username
      const socketData = {
        winner,
        nextPlayer, //undefined or string
        data: newPieceData
      }
      setPlayerNow(nextPlayer)
      winner && resetGame(winner)
      //
      socket.emit('set_piece', socketData)
    }
  }, [pieceData, userData, userNow])
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
    window.onbeforeunload = function(e) {
      //exit at game started, reset and emit leave room
      if(gameStart) {
        return 
      }
    }
    return () => {
      window.onbeforeunload = null
    }
  }, [gameStart, userData, userNow])
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
  
  //
  const isWaiting = userNow && !gameStart
  return (
    <div>
      {gameStart && (
        <>
          <UserInfo 
            userNow={ userNow }
            playerNow={ playerNow }
            userData={ userData } />
          <Board>
            <Pieces setPiece={ playerNow === userNow && handleSetData }  pieceData={ pieceData } />
          </Board>
          <Button onClick={ leaveGame.bind(this, userNow) }>{ 'exit game' }</Button>
        </>
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