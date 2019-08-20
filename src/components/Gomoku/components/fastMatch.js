import React from 'react'
import { Button, Paper, Typography } from '@material-ui/core'
import { handleAddInRoomAndSetReady } from '../API'

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
export default FastMatch