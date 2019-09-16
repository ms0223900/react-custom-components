import React, { useState, useCallback } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import JewelGame from '.'
import ResultContent from '../GameFrame/resultContent';
import GameFrame from '../GameFrame';
import { Box, Typography, Container } from '@material-ui/core';
import JewelLevelEnter from './jewelLevelEnter'
import { jewelColors } from './config'

// schema
// const gameRequirement_mockData = {
//   requireScore: 0,
//   limitStep: 0,
//   requireJewels: [
//     { color: '', amount: 0 },
//   ],
//   limitTime: 0
// }

const gameRequirements_mockData = [
  {
    requireScore: 5000,
    limitStep: 3,
    // requireJewels
  },
  {
    requireScore: 10000,
    limitTime: 500,
  },
  {
    limitTime: 2,
    requireJewels: [
      { color: jewelColors[0], amount: 10 },
      { color: jewelColors[1], amount: 3 },
      { color: jewelColors[2], amount: 7 },
    ],
  },
  {
    requireScore: 1000,
    limitTime: 5,
  },
]


const SingleLevelItem = ({ levelNum, setLevelEnterFn }) => {
  return (
    <Box onClick={ setLevelEnterFn }>
      <Typography variant={ 'h3' }> 
        { levelNum }
      </Typography>
    </Box>
  )
}

const LevelList = ({ levels=gameRequirements_mockData }) => {
  const [gameEnterInfo, setInfo] = useState()
  const handleSetInfo = (level) => {
    setInfo({
      level: level + 1,
      gameRequirements: levels[level]
    })
  }
  const handleResetInfo = () => {
    setInfo(null)
  }
  return (
    <Container>
      {levels.map((level, i) => (
        <SingleLevelItem 
          key={ i }
          levelNum={ i + 1 }
          setLevelEnterFn={ () => handleSetInfo(i) }  />
      ))}
      {gameEnterInfo && (
        <JewelLevelEnter 
          gameEnterInfo={ gameEnterInfo }
          cancelFn={ handleResetInfo } />
      )}
    </Container>
  )
}

const GameMode_JewelsRequirement = ({ 
  match, 
  history,
  gameRequirements=gameRequirements_mockData 
}) => {
  const { level } = match.params
  const LEVEL = parseInt(level) - 1
  const handleNextLevel = () => {
    const nextLevel = parseInt(level) + 1
    if(nextLevel <= gameRequirements.length) {
      history.push(`/jewelGame/level/${ parseInt(level) + 1 }`)
    }
  }
  return (
    <>
    <Typography>{ 'Level: ' + level }</Typography>
    <GameFrame 
      key={ LEVEL }
      GameComponent={ JewelGame }
      PopupComponent={ ResultContent }
      resultNextFns={ [handleNextLevel] }
      gameRequirements={ gameRequirements[LEVEL] } />
    </>
  )
}

const JewelGameRouter = () => {
  return (
    <Router>
      <Link to={'/jewelGame'}>
        {'jewel game'}
      </Link>
      <Route 
        path={ '/jewelGame' }
        exact
        render={ () => <LevelList /> } />
      <Route 
        path={ '/jewelGame/level/:level' }
        render={ GameMode_JewelsRequirement } />
    </Router>
  )
}

export default JewelGameRouter