import React from 'react'
import { Paper, Typography } from '@material-ui/core';

const UserInfo = ({ userNow, playerNow, userData }) => {
  const { roomId } = userData[0]
  return (
    <Paper>
      <Typography variant={ 'subtitle1' }>
        { `Room: ${ roomId }`}
      </Typography>
      <Typography variant={ 'h4' }>
        { userNow && `Id: ${ userNow }` }
      </Typography>
      <hr />
      <Typography variant={ 'h5' }>
        { userNow === playerNow ? 'Your turn!' : 'Adversary is thinking...' }
      </Typography>
    </Paper>
  )
}
export default UserInfo