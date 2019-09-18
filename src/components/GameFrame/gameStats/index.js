import React, { useContext } from 'react'
import { FavoriteRounded } from '@material-ui/icons'
import { Box, Container, makeStyles, Typography, Button } from '@material-ui/core'
import ContextStore, { ContextWrapper } from '../context'
import { addStats, minusStats } from '../actionsAndReducers/actions'

const useStyles_singleStatItem = makeStyles({
  root: {
    maxWidth: 100,
    padding: 6,
    borderRadius: 3,
    backgroundColor: '#eee',
  },
  statNumber: {
    margin: 6,
  }
})

const getStatIcon = (statName) => {
  switch (statName) {
  case 'life':
    return <FavoriteRounded htmlColor={ '#f00' } />
  default:
    return <FavoriteRounded />
  }
}

const SingleStatItem = ({ statName, statNumber }) => {
  const classes = useStyles_singleStatItem()
  return (
    <Box 
      className={ classes.root } 
      display={'flex'}
      alignItems={'center'}
    >
      { getStatIcon(statName) }
      <Typography variant={'h5'} className={ classes.statNumber }>
        { statNumber }
      </Typography>
    </Box>
  )
}

const GameStatsFrame = ({ statsInfo }) => {
  return (
    <Container>
      <Box>
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

const GameStatsFrameWithCtx = props => {
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
    dispatch( minusStats('life', 50, alert) )
  }
  return (
    <>
      <Button onClick={ handleAdd }>{ 'add stat + ' }</Button>
      <Button onClick={ handleMinus }>{ 'minus stat - ' }</Button>
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