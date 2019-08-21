import { useCallback } from 'react'
import { updateGomokuRoomState, socket, updateUser } from './API';
import { checkWhoWin, getIndexBetweenNums } from './fn';
import { pointPerRound_PC, pointPerRound_realRival, ranksPoints } from './config';

const updatePointAndRank = (isRealRival, setUserInfoFn) => {
  const id = JSON.parse(localStorage.getItem('userDBid'))
  if(id) {
    const point = JSON.parse(localStorage.getItem('point')) || 0
    const newPoint = isRealRival ? point + pointPerRound_realRival : point + pointPerRound_PC
    const newRank = getIndexBetweenNums(newPoint, ranksPoints)
    updateUser(id, newPoint, newRank)
      .then(() => {
        localStorage.setItem('point', newPoint)
        localStorage.setItem('rank', newRank)
        setUserInfoFn({
          point: newPoint,
          rank: newRank,
        })
      })
  }
}

export function useResetGame(userData, setGameStart, setUserInfo) {
  return useCallback((userNow, winner) => {
    if (winner) {
      const winRes = userNow === winner && winner !== 'PC'
      const resultMes = winRes ? 'You Win!!!' : 'You Lose :(...'
      winRes && updatePointAndRank(false, setUserInfo)
      //
      console.log(winner, userData);
      setTimeout(() => {
        window.alert(resultMes);
        setGameStart(false)
      }, 500)
    }
    //clear room data 
    if (userData) {
      const { roomId } = userData[0];
      updateGomokuRoomState(roomId);
    }
  }, [userData]);
}


export function useHandleSetData(userData, userNow, pieceData, setData, setPlayerNow, resetGame) {
  return useCallback((id) => {
    const userDataNow = userData.find(data => data.username === userNow);
    const pieceColor = userDataNow.color;
    const newPieceData = [...pieceData];
    // console.log(userData, userNow, pieceData, setData, setPlayerNow, resetGame, id)
    if (!newPieceData[id].pieceColor) { //if not be set piece
      newPieceData[id] = {
        user: userNow,
        pieceId: id,
        pieceColor,
      };
      setData(newPieceData);
      //
      const winner = checkWhoWin(newPieceData, userNow);
      const nextPlayer = !winner && userNow === userData[0].username ? userData[1].username : userData[0].username;
      const socketData = {
        winner,
        nextPlayer,
        data: newPieceData
      };
      setPlayerNow(nextPlayer);
      //local call
      winner && resetGame(userNow, winner);
      //
      socket.emit('set_piece', socketData);
    }
  }, [pieceData, userData, userNow]);
}