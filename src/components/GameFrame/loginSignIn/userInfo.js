import React from 'react'
import { Paper, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    padding: 10,
  }
})

const UserInfo = ({ userInfo }) => {
  const classes = useStyles()
  const { point, rank } = userInfo
  return (
    <Paper className={ classes.root }>
      <Typography variant={ 'subtitle1' }>
        { 'point: ' }
        <span>{ point }</span>
      </Typography>
      <Typography variant={ 'subtitle1' }>
        { 'rank: ' }
        <span>{ rank }</span>
      </Typography>
    </Paper>
  )
}
export default UserInfo