import React from 'react'
import { Paper, Typography, Box } from '@material-ui/core'
import { patternInfos } from './fn'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    width: 100,
    height: 200,
    textAlign: 'center',
    transition: '0.2s',
    position: 'absolute',
    top: props => props.index * 30,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#ddd',
      transition: '0.2s'
    }
  },
  box: {
    justifyContent: 'start',
    alignItems: 'top',
    height: '100%'
  },
  img: {
    width: 40,
    height: 40,
  }
})

const mockFn = (pattern, number) => {
  window.alert(pattern + ' ' + number)
}

const CardItem = ({ index=0, pattern='diamond', number='10', clickFn=mockFn }) => {
  const classes = useStyles({ index })
  return (
    <Paper 
      className={ classes.root } 
      onClick={ clickFn.bind(this, pattern, number) }
    >
      <Box className={ classes.box } display={ 'flex' }>
        <img className={ classes.img } src={ patternInfos[pattern].imgSrc } />
        <Typography variant={ 'h4' }>{ number }</Typography>
      </Box>
    </Paper>
  )
}
export default CardItem