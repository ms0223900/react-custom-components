/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect } from 'react'
import { Button, Box, Paper, Typography } from '@material-ui/core'
import Board from './board'
import Pieces from './pieces'
import { checkWhoWin } from './fn'
import { socket } from './API';
import { useStyles } from './styles'
import { updateGomokuRoomState, handleAddInRoomAndSetReady } from './API'

const piecesData_mockData = [...Array(14 * 14).keys()].map(k => ({
  user: null, pieceId: k, pieceColor: null
}))
// piecesData_mockData[0] = { user: '', pieceId: 0, pieceColor: 'black', }
// piecesData_mockData[10] = { user: '', pieceId: 10, pieceColor: 'white', }
// piecesData_mockData[20] = { user: '', pieceId: 20, pieceColor: 'black', }

const userData_mockData = [
  { username: 'Player01', color: 'black' },
  { username: 'Player02', color: 'white' },
]





const App = () => {
  const classes = useStyles()
  const [pieceData, setData] = useState(piecesData_mockData)
  const [userData, setUserData] = useState(null)
  const [userNow, setUserNow] = useState(null)
  const [playerNow, setPlayerNow] = useState('Player01')
  const [gameStart, setGameStart] = useState(false)
  //
  const winAndClearGame = (winner) => {
    console.log('win!!!')
    window.alert(`winner is ${ winner}`)
    setData(piecesData_mockData)
    setUserData(userData_mockData)
    setUserNow(null)
    setGameStart(false)
    //clear mock room
    updateGomokuRoomState(2)
  }
  const handleSetGameStart = () => {
    socket.emit('set_game_start', true)
    setGameStart(true)
  }
  const handleSetData = useCallback((id) => {
    const userDataNow = userData.find(data => data.username === userNow)
    const pieceColor = userDataNow.color
    const newPieceData = [...pieceData]
    if(!newPieceData[id].pieceColor) {
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
      winner && winAndClearGame(winner)
      //
      socket.emit('set_piece', socketData)
    }
  }, [pieceData, userData, userNow])
  //
  const setUser = (user) => {
    const anotherPlayer = user === userData[0].username ? userData[1].username : userData[0].username
    setUserNow(user)
    socket.emit('set_player', anotherPlayer)
  }
  useEffect(() => {
    userData && setPlayerNow(userData[0].username)
  }, [userData])
  //
  useEffect(() => {
    console.log('register socket')
    //socket listen
    socket.on('get_piece', res => {
      setPlayerNow(res.nextPlayer)
      setData(res.data)
      res.winner && winAndClearGame(res.winner)
    })
    socket.on('get_game_start', () => {
      console.log('get_game_start')
      setGameStart(true)
    })
  }, [])
  //
  return (
    <div>
      {gameStart && (
        <>
          <h3>
            { 'This turn is user: ' + playerNow }
            <span>{ userNow === playerNow && ' / your turn!' }</span>
          </h3>
          <hr />
          <h4>{ userNow && `You are ${ userNow }` }</h4>
          <Board>
            <Pieces setPiece={ playerNow === userNow && handleSetData }  pieceData={ pieceData } />
          </Board>
        </>
      )}
      {userNow && !gameStart && (
        <Typography variant={ 'h5' }>
          { 'waiting for another player...' }
        </Typography>
      )}
      {/* {!userNow && (
        <div>
          <h3>{ 'choose your player, or wait for another player.' }</h3>
          <Button variant={ 'contained' } onClick={() => setUser('Player01')}>{ 'Player01' }</Button>
          <Button variant={ 'contained' } onClick={() => setUser('Player02')}>{ 'Player02' }</Button>
        </div>
      )} */}
      {!gameStart && (
        <Paper className={ classes.matchPart }>
          <Typography variant={'h3'}>{'GOMOKU BATTLE'}</Typography>
          <Button 
            variant={ 'contained' } 
            color={ 'primary' } 
            onClick={ () => handleAddInRoomAndSetReady(setUserNow, setUserData, handleSetGameStart) }
          >
            { 'fast match' }
          </Button>
        </Paper>
      )}
    </div>
  )
}

export default App