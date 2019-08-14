import { useCallback } from 'react'
import { updateGomokuRoomState, socket } from './API';
import { piecesData_mockData } from './config';
import { checkWhoWin } from './fn';


export function useResetGame(userData, setData, setUserData, setUserNow, setGameStart) {
  return useCallback(winner => {
    if (winner) {
      console.log(winner, userData);
      winner && window.alert(`winner is ${winner}`);
    }
    //clear room data 
    if (userData) {
      const { roomId } = userData[0];
      updateGomokuRoomState(roomId);
    }
    setData(piecesData_mockData);
    setUserData(null);
    setUserNow(null);
    setGameStart(false);
  }, [userData]);
}


export function useHandleSetData(userData, userNow, pieceData, setData, setPlayerNow, resetGame) {
  return useCallback((id) => {
    const userDataNow = userData.find(data => data.username === userNow);
    const pieceColor = userDataNow.color;
    const newPieceData = [...pieceData];
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
      winner && resetGame(winner);
      //
      socket.emit('set_piece', socketData);
    }
  }, [pieceData, userData, userNow]);
}