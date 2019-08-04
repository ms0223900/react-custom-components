import React, { useState, useCallback } from 'react'
import { Box } from '@material-ui/core';
import CardList from './CardList';
import { useStyles } from './EmptyPart'
// import CardItem from './CardItem';
// import { getNewCardData } from './fn';

const checkCanPutCard = (lastCardInfo, cardInfo) => {
  const { pattern, number } = cardInfo // chosen card info
  const { pattern: lastCardPattern, number: lastCardNumber } = lastCardInfo //origin card line last card
  if(lastCardPattern === pattern && lastCardNumber === number - 1 ) {
    return true
  }
  return false
}

const initCards = [...Array(4).keys()].map(a => ({
  row: a,
  pattern: undefined,
  cardsInLine: [],
}))

const putCardsToLine = (whichLine, cardInfo, originData) => {
  const { pattern } = cardInfo
  const newCardsData = [...originData]
  newCardsData[whichLine] = {
    ...newCardsData[whichLine],
    pattern,
    cardsInLine: [
      ...newCardsData[whichLine].cardsInLine,
      cardInfo
    ]
  }
  return newCardsData
}

const MainPart = ({ chosenCard, setChosenCard }) => {
  let cardInfo
  if(chosenCard) {
    cardInfo = chosenCard.cardInfo
  }
  //
  const classes = useStyles()
  const [mainCards, setMainCards] = useState(initCards)
  const handlePutCardInLine = useCallback((whichLine, cardInfo) => {
    const { pattern, cardsInLine } = mainCards[whichLine]
    const lastCard = cardsInLine[cardsInLine.length - 1]
    const checkIsEmptyAndFirstNumberIsOne = !pattern && cardInfo.number === 1
    if(checkIsEmptyAndFirstNumberIsOne || checkCanPutCard(lastCard, cardInfo)) { //if no pattern(is empty)
      const newCardsData = putCardsToLine(whichLine, cardInfo, mainCards)
      setMainCards(newCardsData)
      setChosenCard(undefined)
    }
  }, [mainCards, chosenCard])
  return (
    <Box display={ 'flex' }>
      {mainCards.map(cardLine => {
        const { row, cardsInLine } = cardLine
        return (
          <Box 
            key={ row } 
            className={ classes.root }
            onClick={ () => handlePutCardInLine(row, cardInfo) }
          >
            <CardList cards={ cardsInLine } whichLine={ row } />
          </Box>
        )
      })}
    </Box>
  )
}
export default MainPart