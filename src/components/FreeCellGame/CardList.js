import React from 'react'
import { Box } from '@material-ui/core';
import CardItem from './CardItem';
import { makeStyles } from '@material-ui/styles';

const mockCards = [
  { pattern: 'diamond', number: 2, },
  { pattern: 'diamond', number: 10, },
  { pattern: 'diamond', number: 7, },
]

const useStyles = makeStyles({
  root: {
    position: 'relative'
  }
})

const CardList = ({ cards=mockCards }) => {
  const classes = useStyles()
  return (
    <Box className={ classes.root }>
      {cards.map((c, i) => (
        <CardItem 
          key={ i }
          index={ i }
          pattern={ c.pattern }
          number={ c.number } />
      ))}
    </Box>
  )
}
export default CardList