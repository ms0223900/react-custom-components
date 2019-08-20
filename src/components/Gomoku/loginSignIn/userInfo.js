import React, { useEffect, useState } from 'react'
import { Paper, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    padding: 10,
  }
})

const UserInfo = () => {
  const classes = useStyles()
  const [pointAndRank, setPtAndRk] = useState({
    point: null,
    rank: null
  })
  useEffect(() => {
    //init
    const point = localStorage.getItem('point')
    const rank = localStorage.getItem('rank')
    setPtAndRk({
      point,
      rank
    })
  }, [])
  //
  const { point, rank } = pointAndRank
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