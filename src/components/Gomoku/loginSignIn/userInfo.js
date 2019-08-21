import React, { useContext } from 'react'
import { Paper, Typography, makeStyles } from '@material-ui/core';
import ContextStore from '../lib/context'

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
export default () => {
  const { userInfo } = useContext(ContextStore)
  return (
    <UserInfo userInfo={ userInfo } />
  )
}