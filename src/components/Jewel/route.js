import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import JewelGame from '.'
import ResultContent from '../GameFrame/resultContent';
import GameFrame from '../GameFrame';

const gameRequirement_mockData = {
  requireScore: 5000,
  limitStep: 3,
  // requireJewels
}

const GameMode_JewelsRequirement = () => {
  return (
    <GameFrame 
      GameComponent={ JewelGame }
      PopupComponent={ ResultContent }
      gameRequirements={ gameRequirement_mockData } />
  )
}

const JewelGameRouter = () => {
  return (
    <Router>
      <Route 
        path={'/'}
        render={ GameMode_JewelsRequirement } />
    </Router>
  )
}

export default JewelGameRouter