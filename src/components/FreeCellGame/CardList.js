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
    position: 'relative',
    width: 100,
    height: 20,
    margin: 10,
  }
})

const CardList = ({ cards=mockCards, clickFn, whichLine, cardAmount }) => {
  const classes = useStyles()
  return (
    <Box className={ classes.root }>
      {cards.map((c, i) => (
        <CardItem 
          key={ c.id }
          index={ i }
          whichLine={ whichLine }
          cardInfo={ c }
          clickFn={ typeof(cardAmount) === 'number' ? 
            cardAmount - 1 === i && clickFn : clickFn } />
      ))}
    </Box>
  )
}
export default CardList