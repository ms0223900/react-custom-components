import React from 'react'
import { Button, Box, Container } from '@material-ui/core'
import Board from './../board'
import Pieces from './../pieces'
import UserInfo from './../userInfo'
import ChatRoom from './../chat/chatRoom';
import Timer from '../../Timer';

const GameMainPart = ({ classes, userNow, playerNow, userData, timerRef, handleSetRandomPiece, handleSetData, pieceData, leaveGame }) => {
  return (
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
  )
}
export default GameMainPart