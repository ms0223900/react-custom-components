import React, { useContext, useCallback } from 'react'
import { 
  StarRounded,
  FavoriteRounded,
  AttachMoneyRounded 
} from '@material-ui/icons'
import { Box, Container, makeStyles, Typography, Button } from '@material-ui/core'
import ContextStore, { ContextWrapper } from '../context'
import { addStats, minusStats } from '../actionsAndReducers/actions'
import { LittleTimer } from '../../Timer'
import { 
  allStats, 
  lifeMax, lifeRecoverMinutes, getLevelUpExp 
} from './config'
import { absolutePos } from '../styles'

const useStyles_singleStatItem = makeStyles({
  root: {
    width: 100,
    margin: 6,
    padding: 6,
    borderRadius: 3,
    backgroundColor: '#eee',
  },
  statNumber: {
    marginLeft: 6,
  },
  coinStat: {
    width: 24,
    height: 24,
    borderRadius: 100,
    backgroundColor: '#fc0',
    '& svg': {
      width: 18,
      height: 18,
    }
  }
})

const statBarWidth = 110
const statBarHeight = 30
const levelRoundRadius = 40
const useStyles_statBar = makeStyles({
  root: {
    position: 'absolute',
    top: (levelRoundRadius - statBarHeight) / 2,
    left: 15,
    width: statBarWidth,
    height: statBarHeight,
    backgroundColor: '#eee',
    borderRadius: 3,
    border: '2px solid #555',
    boxSizing: 'border-box',
  },
  statNumber: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: props => props.percentage * statBarWidth,
    height: '100%',
    transition: '0.3s',
    backgroundColor: '#555',
    borderRadius: 3,
  }
})

const useStyles_levelAndExp = makeStyles({
  root: {
    position: 'relative',
    width: statBarWidth + 20,
    padding: 6,
    margin: 6,
  },
  levelStat: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: levelRoundRadius,
    height: levelRoundRadius,
    backgroundColor: '#888',
    border: '2px solid #111',
    color: '#fff',
    borderRadius: 1000,
    boxSizing: 'border-box',
    fontSize: 24,
    // fontWeight: 200,
  },
  expText: {
    width: '100%',
    textAlign: 'center',
    ...absolutePos,
    top: statBarHeight + 2
  }
})

const StatBar = ({ numberNow, numberMax }) => {
  const percentage = numberNow / numberMax >= 1 ? 1 : numberNow / numberMax
  const classes = useStyles_statBar({ percentage })
  return (
    <Box className={ classes.root }>
      <Box className={ classes.statNumber } />
    </Box>
  )
}



const LevelAndExpStat = ({ levelNumber, expNumber }) => {
  const levelUpExp = getLevelUpExp(levelNumber)
  const classes = useStyles_levelAndExp()
  return (
    <Box className={ classes.root }>
      <StatBar 
        numberNow={ expNumber }
        numberMax={ levelUpExp } />
      <Box 
        className={ classes.levelStat }
        display={'flex'}
        justifyContent={ 'center' }
        alignItems={'center'}
      >
        { levelNumber }
      </Box>
      <Typography className={ classes.expText }>
        { `${ expNumber } / ${ levelUpExp }` }
      </Typography>
    </Box>
  )
}

const getStatIcon = (statName, classes) => {
  switch (statName) {
  case allStats.life:
    return <FavoriteRounded htmlColor={ '#f00' } />
  case allStats.coin:
    return (
      <Box 
        className={ classes.coinStat } 
        display={'flex'}
        justifyContent={ 'center' }
        alignItems={'center'}>
        <AttachMoneyRounded />
      </Box>
    )
  default:
    return <FavoriteRounded />
  }
}

const SingleStatItem = ({ statName, statNumber }) => {
  const { dispatch } = useContext(ContextStore)
  const classes = useStyles_singleStatItem()
  const handleTimeout = useCallback(() => {
    (dispatch && statNumber < lifeMax) && 
      dispatch( addStats(allStats.life, 1) )
  }, [statNumber])
  const showRecoverTimer = statName === allStats.life && statNumber < lifeMax
  return (
    <Box 
      className={ classes.root } 
      display={'flex'}
      alignItems={'center'}
    >
      { getStatIcon(statName, classes) }
      <Typography variant={'h5'} className={ classes.statNumber }>
        { statNumber }
      </Typography>
      {showRecoverTimer && (
        <LittleTimer
          time={ lifeRecoverMinutes * 60 }
          timeoutFn={ handleTimeout } />
      )}
    </Box>
  )
}

const GameStatsFrame = ({ statsInfo }) => {
  const levelStat = statsInfo.find(st => st.statName === allStats.level)
  const expStat = statsInfo.find(st => st.statName === allStats.exp)
  return (
    <Container>
      <Box display={'flex'}>
        {statsInfo.map((st, i) => {
          return (st.statName !== allStats.exp && st.statName !== allStats.level) ? (
            <SingleStatItem 
              key={ i }
              statName={ st.statName } 
              statNumber={ st.statNumber }  />
          ) : (
            null
          )
        })}
        {levelStat && expStat && (
          <LevelAndExpStat 
            levelNumber={ levelStat.statNumber }
            expNumber={ expStat.statNumber }  />
        )}
      </Box>
    </Container>
  )
}

export const GameStatsFrameWithCtx = props => {
  const { statsInfo } = useContext(ContextStore)
  return (
    <GameStatsFrame {...props} statsInfo={ statsInfo } />
  )
}

const testExp = 10
export const ButtonsForTest = () => {
  const { dispatch } = useContext(ContextStore)
  const handleAddLife = () => {
    dispatch && dispatch( addStats('life', 1) )
  }
  const handleMinusLife = () => {
    dispatch && dispatch( minusStats('life', 5, alert) )
  }
  const handleAddExp = () => {
    dispatch && dispatch( addStats('exp', testExp) )
  }
  return (
    <>
      <Button onClick={ handleAddLife }>{ 'add life +1 ' }</Button>
      <Button onClick={ handleMinusLife }>{ 'minus life -5 ' }</Button>
      <Button onClick={ handleAddExp }>{ 'add exp + ' + testExp }</Button>
    </>
  )
}

const GameStatsFrameWithCtxWrapper = props => (
  <ContextWrapper>
    <GameStatsFrameWithCtx {...props} />
    {props.children}
  </ContextWrapper>
)


export default GameStatsFrameWithCtxWrapper