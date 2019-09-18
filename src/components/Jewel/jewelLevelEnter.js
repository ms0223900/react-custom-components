import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CloseRounded } from '@material-ui/icons'
import { Box, Typography, Button, Paper, makeStyles } from '@material-ui/core'
import JewelsRequirePart from './jewelsRequirePart'
import { gameRequirements_mockData } from './config'
import { GameStatsFrameWithCtx } from '../GameFrame/gameStats'
import ContextStore from '../GameFrame/context'
import { minusStats } from '../GameFrame/actionsAndReducers/actions'
import { allStats } from '../GameFrame/gameStats/config'

const getRequirementNameValue = (gameReqObj) => {
  const values = Object.values(gameReqObj)
  return Object.keys(gameReqObj).map((name, i) => ({
    name,
    value: values[i]
  }))
}

const useStyles = makeStyles({
  root: {
    position: 'relative',
    maxWidth: 300,
    padding: 10,
    margin: 10,
    textAlign: 'center',
  },
  startButton: {
    width: 100,
    marginTop: 10,
    borderRadius: 100,
    '& a': {
      width: '100%',
      height: '100%',
      color: '#fff',
      '&:hover': {
        
      }
    }
  },
  closeButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: '#ffad00',
    color: '#fff',
    '& svg': {
      width: '100%',
      height: '100%',
    }
  },
  requireName: {
    fontSize: '1em',
  },
  requireValue: {
    fontSize: '1.5em',
    margin: 4,
  }
})

const JewelLevelEnter = ({
  dispatch,
  match={ params: { level: 1, }}, 
  history,
  gameEnterInfo={ allgameRequirements: gameRequirements_mockData }, 
  cancelFn 
}) => {
  const classes = useStyles()
  const { level } = match.params
  const {
    allgameRequirements
  } = gameEnterInfo
  const gameRequirements = allgameRequirements[parseInt(level) - 1]
  const requireNameValues = getRequirementNameValue(gameRequirements)
  //
  const handleEnterLevel = () => {
    if(window.confirm('are you sure play this level?(need 1 life)')) {
      if(dispatch) {
        history.push(`/jewelGame/level/${ level }`)
        const alertFn = () => window.alert('you life is not enough!')
        dispatch( minusStats(allStats.life, 1, alertFn) )
      }
    }
  }

  return (
    <>
      <Paper className={ classes.root }>
        <Box>
          <Typography 
            variant={ 'h5' } 
            fontWeight={ 'fontWeightLight' }
          >
            {'Level ' + level}
          </Typography>
          <hr />
          {requireNameValues.length > 0 ? (
            requireNameValues.map((req, i) => {
              const { name, value } = req
              if(name === 'requireJewels') {
                return (
                  <JewelsRequirePart 
                    key={ i } 
                    jewels={ value } />
                )
              }
              return (
                <Box 
                  key={ i } 
                  display={'flex'} 
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  <Box className={ classes.requireName }>{ name }</Box>
                  <Box className={ classes.requireValue }>{ value }</Box>
                </Box>
              )
            })
          ) : 'free mode'}
          <Box>
            <Button 
              className={ classes.startButton }
              color={'primary'} 
              variant={'contained'}
              onClick={ handleEnterLevel }
            >
              { 'start' }
            </Button>
          </Box>
          <Link
            className={ classes.closeButton }
            to={ '/jewelGame' }
          >
            <CloseRounded />
          </Link>
        </Box>
      </Paper>
    </>
  )
}

const JewelLevelEnterWithCtx = props => {
  const { dispatch } = useContext(ContextStore)
  return (
    <JewelLevelEnter dispatch={ dispatch } {...props} />
  )
}

export default JewelLevelEnterWithCtx