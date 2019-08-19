import { useCallback } from 'react'
import { updateGomokuRoomState, socket } from './API';
import { checkWhoWin } from './fn';


export function useResetGame(userData, setGameStart) {
  return useCallback((userNow, winner) => {
    if (winner) {
      const resultMes = userNow === winner && winner !== 'PC' ? 'You Win!!!' : 'You Lose :(...'
      console.log(winner, userData);
      setTimeout(() => {
        window.alert(resultMes);
        setGameStart(false)
      }, 1000)
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