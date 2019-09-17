import React, { useState, useCallback } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import JewelGame from '.'
import ResultContent from '../GameFrame/resultContent';
import GameFrame from '../GameFrame';
import { Box, Typography, Container } from '@material-ui/core';
import JewelLevelEnter from './jewelLevelEnter'
import { 
  jewelColors,
  gameRequirements_mockData 
} from './config'
import MultiLevels from '../GameFrame/multiLevels';

const levelData_init = gameRequirements_mockData.map((data, i) => ({
  id: i,
  level: i + 1,
  star: 0
}))

const GameMode_JewelsRequirement = ({ 
  match, 
  history,
  setLevelDataFn,
  gameRequirements=gameRequirements_mockData 
}) => {
  const { level } = match.params
  const LEVEL = parseInt(level) - 1
  const handleNextLevel = () => {
    const nextLevel = parseInt(level) + 1
    if(nextLevel <= gameRequirements.length) {
      history.push(`/jewelGame/enter/${ parseInt(level) + 1 }`)
    }
  }
  const handleSetLevelData = ({ star, score }) => {
    setLevelDataFn(LEVEL, star, score)
  }
  return (
    <>
    <Typography>{ 'Level: ' + level }</Typography>
    <GameFrame 
      key={ LEVEL }
      GameComponent={ JewelGame }
      PopupComponent={ ResultContent }
      resultNextFns={ [handleNextLevel] }
      setLevelDataFn={ handleSetLevelData }
      gameRequirements={ gameRequirements[LEVEL] } />
    </>
  )
}


const JewelGameRouter = () => {
  const [levelData, setLevelData] = useState(levelData_init)
  const handleSetLevelData = useCallback((id, star, highScore) => {
    let newLevelData = [...levelData]
    newLevelData[id] = {
      ...newLevelData[id],
      star,
      highScore
    }
    setLevelData(newLevelData)
  }, [levelData])
  return (
    <Router>
      <Link to={'/jewelGame'}>
        {'jewel game'}
      </Link>
      <Route 
        path={ '/jewelGame' }
        exact
        render={ () => (
          <MultiLevels 
            levelData={ levelData }
            isComponentView={ false }
            baseUrl={ '/jewelGame/enter/' } />
        ) } 
      />
      <Route 
        path={ '/jewelGame/enter/:level' }
        render={ props => (
          <JewelLevelEnter 
            {...props}
            gameEnterInfo={{ allgameRequirements: gameRequirements_mockData }} />
        ) }  
      />
      <Route 
        path={ '/jewelGame/level/:level' }
        render={ props => (
          <GameMode_JewelsRequirement 
            {...props}
            setLevelDataFn={ handleSetLevelData } />
        ) } />
    </Router>
  )
}

export default JewelGameRouter