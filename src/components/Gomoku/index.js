import React, { useState, useCallback, useEffect } from 'react'
import Board from './board'
import Pieces from './pieces'

const piecesData_mockData = [...Array(14 * 14).keys()].map(k => ({
  user: null, pieceId: k, pieceColor: null
}))
// piecesData_mockData[0] = { user: '', pieceId: 0, pieceColor: 'black', }
// piecesData_mockData[10] = { user: '', pieceId: 10, pieceColor: 'white', }
// piecesData_mockData[20] = { user: '', pieceId: 20, pieceColor: 'black', }

const userData_mockData = [
  { username: 'aaa', color: 'black', isPlay: true, },
  { username: 'bbb', color: 'white', isPlay: false, },
]

const checkIds_ArrInArr = (arr1=[], arr2=[]) => {
  // console.log(arr1, arr2)
  const amount = arr1.length
  let count = 0
  arr2.forEach(arr => {
    if(arr1.indexOf(arr) !== -1) {
      count += 1
    } 
  })
  return count === amount
}

const checkWhoWin = (pieceData, user) => {
  const array5 = [...Array(5).keys()]
  const filteredPieces = pieceData.filter(data => data.user === user)
  const filteredPiecesIds = filteredPieces.map(piece => piece.pieceId)
  // console.log(filteredPiecesIds)
  const checkDirections = (pieceId) => {
    const topLeftIds = array5.map(i => pieceId - i * 15)
    const topIds = array5.map(i => pieceId - i * 14)
    const topRightIds = array5.map(i => pieceId - i * 13)
    const leftIds = array5.map(i => pieceId - i * 1)
    const rightIds = array5.map(i => pieceId + i * 1)
    const bottomLeftIds = array5.map(i => pieceId + i * 13)
    const bottomIds = array5.map(i => pieceId + i * 14)
    const bottomRightIds = array5.map(i => pieceId + i * 15)
    const directionIds = [topLeftIds, topIds, topRightIds, leftIds, rightIds, bottomLeftIds, bottomIds, bottomRightIds]
    for (let i = 0; i < directionIds.length; i++) {
      const ids = directionIds[i]
      if(checkIds_ArrInArr(ids, filteredPiecesIds)) {
        return true
      }
    }
  }
  //
  const checkIsFulfill = () => {
    if(filteredPieces.length < 5) {
      return false
    } else {
      for (let i = 0; i < filteredPiecesIds.length; i++) {
        const id = filteredPiecesIds[i]
        const res = checkDirections(id)
        if(res) {
          return true
        }
      }
    }
  }
  if(checkIsFulfill()) return user
}


const App = () => {
  const [pieceData, setData] = useState(piecesData_mockData)
  const [userData, setUserData] = useState(userData_mockData)
  const handleSetData = useCallback((id) => {
    const userDataNow = userData.find(data => data.isPlay)
    const pieceColor = userDataNow.color
    const userNow = userDataNow.username
    const newPieceData = [...pieceData]
    if(!newPieceData[id].pieceColor) {
      newPieceData[id] = {
        user: userNow,
        pieceId: id,
        pieceColor,
      }
      setData(newPieceData)
    }
  }, [pieceData, userData])
  useEffect(() => {
    const { username } = userData.find(data => data.isPlay)
    const gameWinner = checkWhoWin(pieceData, username)
    if(gameWinner) {
      setTimeout(() => {
        window.alert(gameWinner)
        setData(piecesData_mockData)
        setUserData(userData_mockData)
      }, 1000)
    } else {
      if(pieceData.find(data => data.user)) {
        const newUserData = [
          { ...userData[0], isPlay: !userData[0].isPlay, },
          { ...userData[1], isPlay: !userData[1].isPlay, },
        ]
        setUserData(newUserData)
      }
    }
    //
  }, [pieceData])
  //
  const userIsPlayNow = userData.find(data => data.isPlay).username
  return (
    <div>
      <h3>{ 'user: ' + userIsPlayNow }</h3>
      <Board>
        <Pieces setPiece={ handleSetData }  pieceData={ pieceData } />
      </Board>
    </div>
  )
}

export default App