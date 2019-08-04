import React, { useState, useCallback, useReducer, useEffect } from 'react'
import { Box, Typography } from '@material-ui/core';
import { getRandomSplitCards } from './fn'
import CardList from './CardList'
import CardItem from './CardItem'
import EmptyPart from './EmptyPart'
import MainPart from './MainPart';
import { makeStyles } from '@material-ui/styles';

//
const useStyles = makeStyles({
  root: {
    margin: 'auto',
    maxWidth: 1000,
  },
  cardLists: {
    justifyContent: 'space-between',
  }
})

const cardLines_action_remove = (whichLine) => ({
  type: 'remove',
  whichLine,
})
const cardLines_action_add = (whichLine, cardInfo) => ({
  type: 'add',
  whichLine,
  cardInfo
})
// const 
const cardLins_reducer = (state, action) => {
  const { type } = action
  switch (type) {
    case 'remove': {
      const { whichLine } = action
      let newCardLines = [...state]
      newCardLines[whichLine].pop()
      return newCardLines
    }
    case 'add': {
      const { whichLine, cardInfo } = action
      let newCardLines = [...state]
      newCardLines[whichLine].push(cardInfo)
      return newCardLines
    }
    default:
      return state
  }
}

const App = () => {
  const classes = useStyles()
  const randomsCards = getRandomSplitCards()
  const [cardLines, dispatch] = useReducer(cardLins_reducer, randomsCards)
  const [chosenCard, setChosenCard] = useState(undefined)
  //
  const redoCard = useCallback(() => {
    const { whichLine, cardInfo } = chosenCard
    if(whichLine) {
      dispatch( cardLines_action_add(whichLine, cardInfo) )
      setChosenCard(undefined)
    }
  }, [chosenCard])
  //
  const handleCardSetFn = useCallback((whichLine, cardInfo) => {
    const { number, color } = cardInfo
    //choose card and remove
    if(!chosenCard) {
      // setChosenCard(cardInfo)
      setChosenCard({
        whichLine,
        cardInfo,
      })
      dispatch( cardLines_action_remove(whichLine) )
    } else {
      //check card color is revers and smaller than clicked card
      // console.log(color, number)
      const { cardInfo } = chosenCard
      const checkColor = 
        (color === 'red' && cardInfo.color === 'black') ||
        (color === 'black' && cardInfo.color === 'red')
      const checkNum = number > cardInfo.number
      if(checkColor && checkNum) {
        dispatch( cardLines_action_add(whichLine, cardInfo) )
        setChosenCard(undefined)
      }
    }
    
  }, [chosenCard, cardLines, dispatch])
  //
  useEffect(() => {
    //redo need to redo cardLines!!
    const redo = (e) => {
      const { keyCode } = e //90
      if(keyCode === 90) {
        redoCard()
      }
    }
    window.addEventListener('keydown', redo)
    return () => {
      window.removeEventListener('keydown', redo)
    }
  }, [chosenCard])
  console.log(chosenCard)
  return (
    <>
      <Box className={ classes.root }>
        <Box display={ 'flex' }>
          <EmptyPart 
            chosenCard={ chosenCard }
            setChosenCard={ setChosenCard } />
          <Box style={{ width: 50, }} />
          <MainPart 
            chosenCard={ chosenCard } 
            setChosenCard={ setChosenCard } />
        </Box>
        <Box display={ 'flex' } className={ classes.cardLists }>
          {cardLines.map((cards, i) =>(
            <CardList 
              clickFn={ handleCardSetFn }
              cards={ cards } 
              cardAmount={ cards.length }
              whichLine={ i } />
          ))}
        </Box>
      </Box>
      {chosenCard && (
        <Box>
          <Typography variant={ 'subtitle1' }>{ 'Chosen Card' }</Typography>
          <CardItem clickFn={ redoCard } cardInfo={ chosenCard.cardInfo } />
        </Box>
      )}
    </>
  )
}
export default App