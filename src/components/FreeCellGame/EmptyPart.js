import React, { useState, useCallback } from 'react'
import { Box } from '@material-ui/core';
import CardItem from './CardItem'
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  root: {
    position: 'relative',
    width: 100,
    height: 200,
    margin: 10,
    backgroundColor: '#ddd',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#aaa',
    }
  }
})

const initCards = [...Array(4).keys()].map(a => ({
  row: a,
  isEmpty: true,
  cardInfo: undefined,
}))

const EmptyPartCard = ({ isEmpty, cardInfo, setEmptyCardFn,  }) => {
  const classes = useStyles()
  if(isEmpty) {
    return (
      <Box
        className={ classes.root } 
        onClick={ !cardInfo && setEmptyCardFn } />
    )
  } else {
    return (
      <CardItem 
        clickFn={ setEmptyCardFn } 
        cardInfo={ cardInfo } />
    )
  }
  
}

const EmptyPart = ({ chosenCard, setChosenCard }) => {
  let cardInfo
  if(chosenCard) {
    cardInfo = chosenCard.cardInfo
  }
  const classes = useStyles()
  const [emptyCards, setCards] = useState(initCards)
  const handleSetCard = useCallback((whichLine, cardInfo) => {
    console.log(whichLine, cardInfo)
    const newCards = [...emptyCards]
    newCards[whichLine] = {
      ...newCards[whichLine],
      isEmpty: false,
      cardInfo,
    }
    setCards(newCards)
    setChosenCard(undefined)
  }, [cardInfo])
  //
  const handleSetCardFromEmpty = useCallback((whichLine, cardInfo) => {
    const newCards = [...emptyCards]
    newCards[whichLine] = {
      ...newCards[whichLine],
      isEmpty: true,
      cardInfo: undefined,
    }
    setCards(newCards)
    setChosenCard({
      whichLine: undefined,
      cardInfo,
    })
  }, [emptyCards, setChosenCard])
  //
  console.log(emptyCards)
  return (
    <Box display={ 'flex' }>
      {emptyCards.map(c => (
        <Box className={ classes.root }>
          <EmptyPartCard 
            key={ c.row }
            isEmpty={ c.isEmpty }
            cardInfo={ c.cardInfo }
            setEmptyCardFn={ 
              c.isEmpty ? 
              () => chosenCard && handleSetCard(c.row, cardInfo) : 
              () => handleSetCardFromEmpty(c.row, c.cardInfo) 
            } 
          />
        </Box>
      ))}
    </Box>
  )
}
export default EmptyPart