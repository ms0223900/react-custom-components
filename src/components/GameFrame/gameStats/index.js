import React, { useContext, useCallback } from 'react'
import { 
  FavoriteRounded,
  AttachMoneyRounded 
} from '@material-ui/icons'
import { Box, Container, makeStyles, Typography, Button } from '@material-ui/core'
import ContextStore, { ContextWrapper } from '../context'
import { addStats, minusStats } from '../actionsAndReducers/actions'
import { LittleTimer } from '../../Timer'
import { 
  allStats, 
  lifeMax, lifeRecoverMinutes 
} from './config'

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
  return (
    <Container>
      <Box display={'flex'}>
        {statsInfo.map((st, i) => (
          <SingleStatItem 
            key={ i }
            statName={ st.statName } 
            statNumber={ st.statNumber }  />
        ))}
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


export const ButtonsForTest = () => {
  const { dispatch } = useContext(ContextStore)
  const handleAdd = () => {
    dispatch( addStats('life', 1) )
  }
  const handleMinus = () => {
    const alert = () => window.alert('no!')
    dispatch( minusStats('life', 5, alert) )
  }
  return (
    <>
      <Button onClick={ handleAdd }>{ 'add stat +1 ' }</Button>
      <Button onClick={ handleMinus }>{ 'minus stat -5 ' }</Button>
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