import React, { useState, useCallback, useEffect } from 'react'
import {
  cellSize,
  getDifficultyEmptyBlocks,
  allPosibleTwoDigitsNumbers,
  getRandomNumberAndGetRandomFac,
  fillNumsToBlocks,
  randomBlankNumbers,
} from './config'
import { Box, makeStyles, Paper, Button, Typography } from '@material-ui/core';
import SingleBlockItem from './singleBlockItem';
import SingleOperationItem from './singleOperationItem';

// console.log(getRandomNumberAndGetRandomFac(nums))

const useStyles = makeStyles({
  root: {
    width: cellSize * 7,
    margin: '20px auto',
    padding: 30,
    textAlign: 'center',
    backgroundColor: '#f2ffff',
  },
  gameHead: {
    minWidth: cellSize * 7 + 20,
    alignItems: 'center',
  },
  gamePart: {
    position: 'relative',
    // zIndex: -1,
    width: cellSize * 7,
    height: cellSize * 9,
    // margin: '30px auto',
    fontSize: 0,
  },
  operationRow: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: cellSize / 2,
    zIndex: 2,
  },
  operationColumn: {
    position: 'absolute',
    width: '100%',
    top: cellSize / 2 - 1,
    left: 0,
    zIndex: 2,
  },
  numberBlocks:  {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  numberBlocksOutline: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
  }
})

const getNumbersData = (emptyAmount) => {
  const posibleTwoDigitsNums = allPosibleTwoDigitsNumbers()
  const nums = getRandomNumberAndGetRandomFac(posibleTwoDigitsNums)
  const blocks = fillNumsToBlocks(nums)
  const { operations, numbers } = blocks
  const { numbersData, blankedNumbersForCheck } = randomBlankNumbers(numbers, emptyAmount)
  return { 
    operations, 
    numbers: numbersData, 
    blankedNumbersForCheck 
  }
}

const checkAnswer = (blankNums) => {
  for (let i = 0; i < blankNums.length; i++) {
    const { answer, number } = blankNums[i]
    if(String(answer) !== String(number)) {
      return false
    }
  }
  return true
}


const GARAM = () => {
  const classes = useStyles()
  const [difficulty, setDiff] = useState('easy')
  const [ allNumbersData, setData ] = useState(getNumbersData())
  const { operations, numbers, blankedNumbersForCheck } = allNumbersData
  const { opeRes_rowCenter, opeRes_columnCenter } = operations
  console.log(blankedNumbersForCheck)
  //
  const handleBlankInput = useCallback((e, idx) => {
    const newNumbers = [...numbers]
    const newBlanked = [...blankedNumbersForCheck]
    const { value } = e.target
    const newValue = value[value.length - 1]
    const isUndefined = typeof(newValue) === 'undefined' //all deleted
    // console.log(newValue)
    if(!isNaN( parseInt(newValue) ) || isUndefined) {
      const newNumInput = isUndefined ? '' : newValue
      newNumbers[idx] = {
        ...newNumbers[idx],
        number: newNumInput,
      }
      //set blank data for check
      const blankIdx = newBlanked.findIndex(blank => blank.index === idx)
      newBlanked[blankIdx].number = newNumInput
      setData({
        ...allNumbersData,
        numbers: newNumbers,
        blankedNumbersForCheck: newBlanked,
      })
    }
  }, [allNumbersData])
  const handleNextGaram = useCallback(() => {
    const emptyBlocksAmount = getDifficultyEmptyBlocks(difficulty)
    setData(getNumbersData(emptyBlocksAmount))
  }, [difficulty])
  //check answer
  useEffect(() => {
    const { blankedNumbersForCheck } = allNumbersData
    const checkResult = checkAnswer(blankedNumbersForCheck)
    if(checkResult) {
      window.alert('You Win!')
    }
  }, [allNumbersData])
  
  //
  return (
    <Paper className={ classes.root }>
      <Box display={ 'flex' } className={ classes.gameHead }>
        <Box>
          <Typography variant={ 'h4' }>{ 'GARAM' }</Typography>
          <Typography variant={ 'subtitle1' }>{ 'difficulty: ' + difficulty }</Typography>
        </Box>
        <Box>
          <Button 
            variant={ 'contained' }
            color={ difficulty === 'easy' ? 'primary' : 'default' }
            onClick={ () => setDiff('easy') }>{ 'easy' }</Button>
          <Button 
            variant={ 'contained' }
            color={ difficulty === 'medium' ? 'primary' : 'default' }
            onClick={ () => setDiff('medium') }>{ 'medium' }</Button>
          <Button 
            variant={ 'contained' }
            color={ difficulty === 'hard' ? 'primary' : 'default' }
            onClick={ () => setDiff('hard') }>{ 'hard' }</Button>
        </Box>

      </Box>
      <Box className={ classes.gamePart }>
        <Box className={ classes.operationRow }>
          {opeRes_rowCenter.map((ope, i) => (
            <SingleOperationItem key={ i } operation={ ope } />
          ))}
        </Box>
        <Box className={ classes.operationColumn }>
          {opeRes_columnCenter.map((ope, i) => (
            <SingleOperationItem key={ i } operation={ ope } />
          ))}
        </Box>
        <Box className={ classes.numberBlocks }>
          {numbers.map((data, i) => {
            const { type, number } = data
            return (
              <SingleBlockItem 
                key={ i }
                index={ i }
                type={ type }
                number={ number }
                isBlock={ false }
                setBlankInput={ handleBlankInput } />
            )
          })}
        </Box>
        <Box className={ classes.numberBlocksOutline }>
          {numbers.map((num, i) => (
            <SingleBlockItem 
              key={ i }
              isBlock={ num.type !== 'empty' } />
          ))}
        </Box>
      </Box>
      <Button
        onClick={ handleNextGaram } 
        color={ 'primary' } 
        variant={ 'contained' }>
        { 'Next' }
      </Button>
    </Paper>
  )
}

export default GARAM

