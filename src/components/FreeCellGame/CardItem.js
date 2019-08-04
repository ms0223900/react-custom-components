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

const mockFn = (id, pattern, number) => {
  console.log(id, pattern, number)
}

const CardItem = ({ index=0, cardInfo, clickFn=mockFn, whichLine=undefined }) => {
  const classes = useStyles({ index })
  const { pattern='diamond', number='10' } = cardInfo
  return (
    <Paper 
      className={ classes.root } 
      onClick={ clickFn && clickFn.bind(this, whichLine, cardInfo) }
    >
      <Box className={ classes.box } display={ 'flex' }>
        <img className={ classes.img } src={ patternInfos[pattern].imgSrc } />
        <Typography variant={ 'h4' }>{ number }</Typography>
      </Box>
    </Paper>
  )
}
export default CardItem