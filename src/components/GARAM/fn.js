/* eslint-disable no-unused-vars */
import {
  cellSize,
  getDifficultyEmptyBlocks,
  allPosibleTwoDigitsNumbers,
  getRandomNumberAndGetRandomFac,
  fillNumsToBlocks,
  randomBlankNumbers,
} from './config'

export const getNumbersData = (emptyAmount) => {
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

export const checkAnswer = (blankNums) => {
  for (let i = 0; i < blankNums.length; i++) {
    const { answer, number } = blankNums[i]
    if(String(answer) !== String(number)) {
      return false
    }
  }
  return true
}
