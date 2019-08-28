import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { Paper, Typography, Container } from '@material-ui/core';

const GameModeChoose = () => (
  <Container>
    <Paper>
      <Link to={ '/limitTime' }>
        <Typography variant={'h4'}>{ 'Limit Time' }</Typography>
      </Link>
    </Paper>
    <Paper>
      <Link to={ '/speedMode' }>
        <Typography variant={'h4'}>{ 'Speed Mode' }</Typography>
      </Link>
    </Paper>
  </Container>
)

const GARAMGameRouter = () => {
  return (
    <Router>
      <Route path={'/'} render={ GameModeChoose } />
      
    </Router>
  )
}

export default GARAMGameRouter