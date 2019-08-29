/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { Paper, Typography, Container, Box } from '@material-ui/core';
import {
  ShutterSpeed,
  Timer,
  ViewModule,
} from '@material-ui/icons'
import GARAM from '.';
import ResultContent from '../GameFrame/resultContent';
import GameFrame from '../GameFrame';
import { makeStyles } from '@material-ui/styles';
import MultiLevels from '../GameFrame/multiLevels';
import { initLevelData } from '../GameFrame/config';

const useStyles = makeStyles({
  root: {
    '& a': {
      textDecoration: 'none',
    }
  },
  gameModeBlock: {
    margin: '0px 5px',
    padding: 6,
    textAlign: 'center',
    '&:hover': {
      backgroundColor: '#eee',
    },
    '& svg': {
      fontSize: 40,
    },
  }
})

const Game = (gameMode='limitTime') => () => (
  <>
    <Typography align={'center'} variant={'h5'}>{gameMode}</Typography>
    <GameFrame 
      GameComponent={ GARAM } 
      PopupComponent={ ResultContent } 
      gameMode={ gameMode } />
  </>
)

const MultiLevelGame = ({ match, history, setLevelData }) => {
  const { level } = match.params
  const handleNextLevel = () => {
    history.push(`/gameMode/multiLevel/level/${ parseInt(level) + 1 }`)
  }
  // console.log(level)
  return (
    <>
      <Link to={ '/gameMode/multiLevel' }>
        <Typography variant={'h5'}>{ '< Level Choose' }</Typography>
      </Link>
      <GameFrame 
        GameComponent={ GARAM } 
        PopupComponent={ ResultContent } 
        resultNextFns={ [handleNextLevel] }
        gameMode={ 'multiLevel' }
        level={ parseInt(level) }
        setLevelDataFn={ setLevelData } />
    </>
  )
}

const GameModeChoose = () => {
  const classes = useStyles()
  const GameModeItem = ({ gameMode, url, Icon }) => (
    <Link to={ `/gameMode/${ url }` }>
      <Paper className={ classes.gameModeBlock } elevation={ 5 }>
        <Icon />
        <Typography variant={'h4'}>{ gameMode }</Typography>
      </Paper>
    </Link>
  )
  return (
    <Container className={ classes.root }>
      <Typography variant={ 'h3' }>{'Game Mode'}</Typography>
      <Box display={ 'flex' }>
        <GameModeItem 
          url={ 'limitTime' }
          Icon={ Timer }
          gameMode={ 'Limit Time' } />
        <GameModeItem 
          url={ 'speedMode' }
          Icon={ ShutterSpeed }
          gameMode={ 'Speed Mode' } />  
        <GameModeItem 
          url={ 'multiLevel' }
          Icon={ ViewModule }
          gameMode={ 'Multi Level' } />
      </Box>
    </Container>
  )
}

const GARAMGameRouter = () => {
  // window.alert(window.location)
  const [levelData, setLevelData] = useState(initLevelData(10))
  const handleSetLevelData = useCallback(result => {
    let newLevelData = [...levelData]
    const { level, score, star } = result
    newLevelData[level - 1] = ({
      ...newLevelData[level - 1],
      score,
      star,
    })
    setLevelData(newLevelData)
  }, [levelData])
  //
  return (
    <Router>
      <Link to={'/gameMode'}>{'Game Mode Choose'}</Link>
      <Route 
        path={ '/gameMode' } 
        exact 
        render={ () => <GameModeChoose /> } />
      <Route 
        path={'/gameMode/limitTime'} 
        render={ Game('limitTime') } />
      <Route 
        path={'/gameMode/speedMode'} 
        render={ Game('speedMode') } />
      <Route 
        path={ '/gameMode/multiLevel' }
        exact
        render={ () => (
          <MultiLevels 
            levelData={ levelData } 
            isComponentView={ false } />
        ) } />
      <Route 
        path={ '/gameMode/multiLevel/level/:level' } 
        render={ props => (
          <MultiLevelGame 
            {...props} 
            setLevelData={ handleSetLevelData } />
        ) } 
      />
    </Router>
  )
}

export default GARAMGameRouter