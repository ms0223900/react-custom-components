/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect, forwardRef, useImperativeHandle } from 'react'
import {
  cellSize,
  getDifficultyEmptyBlocks,
} from './config'
import { Box, makeStyles } from '@material-ui/core';
import { getNumbersData, checkAnswer } from './fn'
import SingleBlockItem from './singleBlockItem';
import SingleOperationItem from './singleOperationItem';
// console.log(getRandomNumberAndGetRandomFac(nums))

const useStyles = makeStyles({
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

const getResultContent = (level=0) => ({
  level,
  score: level * 1000,
})

const getDataByDifficulty = (difficulty) => (
  getNumbersData(getDifficultyEmptyBlocks(difficulty))
)

const GaramMainGame = ({ 
  gameMode='limitTime', 
  difficulty,
  timerPause, 
  gameOverFn, 
  setClearedLevelFn 
}, ref) => {
  console.log(difficulty)
  const classes = useStyles()
  const [clearedLevel, setLevel] = useState(0)
  // const [difficulty] = useState('easy')
  const [ allNumbersData, setData ] = useState( getDataByDifficulty(difficulty) )
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

  const handleSetData = useCallback(() => {
    setData(getDataByDifficulty(difficulty))
  }, [difficulty])

  const handleNextGaram = useCallback(() => {
    setClearedLevelFn(lvl => lvl + 1)
    handleSetData()
  }, [clearedLevel, difficulty])

  useEffect(() => {
    handleSetData()
  }, [difficulty])

  //check answer
  useEffect(() => {
    const { blankedNumbersForCheck } = allNumbersData
    const checkResult = checkAnswer(blankedNumbersForCheck)
    if(checkResult) {
      // overFn(resultContent_mockData)
      //game mode 
      if(gameMode === 'speedMode' || gameMode === 'multiLevel') {
        gameOverFn( getResultContent(clearedLevel) )
      } else if(gameMode === 'limitTime') {
        handleNextGaram()
      }
      
    }
  }, [allNumbersData])
  useImperativeHandle(ref, () => ({
    handleNext: () => {
      handleNextGaram()
      setLevel(0)
    },
    handleResetGame: handleSetData,
  }))
  //
  return (
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
      {!timerPause && (
        <Box className={ classes.numberBlocks }>
          {numbers.map((data, i) => {
            // console.log(data)
            const { type, number, answer } = data
            const isCorrect = parseInt(answer) === parseInt(number)
            return (
              <SingleBlockItem 
                key={ i }
                index={ i }
                type={ type }
                number={ number }
                isBlock={ false }
                isCorrect={ isCorrect }
                setBlankInput={ handleBlankInput } />
            )
          })}
        </Box>
      )}
      <Box className={ classes.numberBlocksOutline }>
        {numbers.map((num, i) => (
          <SingleBlockItem 
            key={ i }
            isBlock={ num.type !== 'empty' } />
        ))}
      </Box>
    </Box>
  )
}

// export default GARAM
export default forwardRef(GaramMainGame) 

