/* eslint-disable no-unused-vars */
import _ from 'lodash'

export const cellSize = 50
export const primaryColor = '#0051ff'
export const getDifficultyEmptyBlocks = (difficulty) => {
  switch (difficulty) {
    case 'easy':
      return 8
    case 'medium':
      return 12
    case 'hard':
      return 16
    default:
      return 8;
  }
}



const getArrs = (arrCount, res=undefined) => (
  [...Array(arrCount).keys()].map(a => res)
)

const checkIsDuplicateAndGetNewRes = (numData, res) => {
  const { num, factorization } = numData
  const newRes = [...res]
  const resNums = res.map(r => r.num)
  const numIndex = resNums.indexOf(num)

  if(numIndex === -1) {
    return [...res, {
      ...numData,
      factorization: [factorization]
    }]
  } else {
    newRes[numIndex] = {
      ...newRes[numIndex],
      factorization: [
        ...newRes[numIndex].factorization,
        factorization
      ]
    }
    return newRes
  }
}

export const allPosibleTwoDigitsNumbers = () => {
  let res = []

  for (let i = 1; i <= 9; i++) {
    for (let j = 1; j <= 9; j++) {
      const numMulti = i * j
      const numPlus = i + j
      if(numMulti >= 10) {
        res = checkIsDuplicateAndGetNewRes({
          num: numMulti,
          factorization: ['x', i, j]
        }, res)
      }
      if(numPlus >= 10) {
        res = checkIsDuplicateAndGetNewRes({
          num: numPlus,
          factorization: ['+', i, j]
        }, res)
      }
    }
  }
  return res
}

export const getRandomNumberAndGetRandomFac = (possibleNumbers) => {
  const res = []
  const randomedNums = _.shuffle(possibleNumbers)
  for (let i = 0; i < 8; i++) {
    const numData = randomedNums[i]
    const { num, factorization } = numData
    const randomedFac = _.shuffle(factorization)[0]
    res[i] = {
      num,
      factorization: randomedFac,
    }
  }
  return res
}

export const fillEmptyNum = (num1Req, num2Res) => {
  const emptyNum = num2Res - num1Req
  if(emptyNum > 0) {
    return ['+', emptyNum]
  } else {
    return ['-', Math.abs(emptyNum)]
  }
}

export const flatNumAndFacsToAllNums = (numFacs) => (
  numFacs.map(numFac => {
    const { num, factorization } = numFac
    const [operation, factor1, factor2] = factorization
    const splitNum = String(num).split('').map(num => num * 1)
    return {
      operation,
      numArr: [factor1, factor2, splitNum[0], splitNum[1]]
    }
  })
)

export const fillNumsToBlocks = (twoDigitsNums) => {
  const flattedNums = flatNumAndFacsToAllNums(twoDigitsNums)
  let numRes = getArrs(7 * 9) //7 * 9 blocks
  let opeRes_rowCenter = getArrs(7 * 9)
  let opeRes_columnCenter = getArrs(7 * 8)

  //1. two digits numbers
  for (let i = 0; i < 8; i++) {
    const { operation, numArr } = flattedNums[i]
    let idx
    const arrangeNums = (idx, j) => {
      numRes[idx] = numArr[j]
        if(j === 0) { //only first
          opeRes_columnCenter[idx] = operation
        } else if(j === 1) {
          opeRes_columnCenter[idx] = '='
        }
    }
    for (let j = 0; j < 4; j++) {
      if(i < 4) {
        idx = i * 2 + j * 7
        arrangeNums(idx, j)
      } else {
        idx = (i - 4) * 2 + j * 7 + 35
        arrangeNums(idx, j)
      }
    }
  }
  //2. fill empty blocks(4 main blocks)
  const emptyMainBlocksIndex = [1, 5, 22, 26, 36, 40, 57, 61]
  for (let i = 0; i < 8; i++) {
    const idx = emptyMainBlocksIndex[i]
    const [operation, num] = fillEmptyNum(numRes[idx - 1], numRes[idx + 1])
    numRes[idx] = num
    opeRes_rowCenter[idx] = '='
    opeRes_rowCenter[idx - 1] = operation
  }
  //3. fill bridge blocks
  const emptyBridgeBlocks = [10, 29, 33, 45]
  for (let i = 0; i < emptyBridgeBlocks.length; i++) {
    const idx = emptyBridgeBlocks[i]
    if(idx === 29 || idx === 33) { //column direction
      const [operation, num] = fillEmptyNum(numRes[idx - 7], numRes[idx + 7])
      numRes[idx] = num
      opeRes_columnCenter[idx] = '='
      opeRes_columnCenter[idx - 7] = operation
    } else {
      const [operation, num] = fillEmptyNum(numRes[idx - 1], numRes[idx + 1])
      numRes[idx] = num
      opeRes_rowCenter[idx] = '='
      opeRes_rowCenter[idx - 1] = operation
    }
  }
  return {
    operations: {
      opeRes_rowCenter,
      opeRes_columnCenter,
    },
    numbers: numRes
  }
}

export const formatNumbers = (nums) => (
  nums.map(number => {
    if(typeof(number) === 'number') {
      return {
        type: 'number',
        number,
      }
    } else {
      return ({
        type: 'empty',
      })
    }
  })
)

export const randomBlankNumbers = (originNums, amountOfEmptyBlocks=8) => {
  let newNums = formatNumbers(originNums)
  let numbersIndexes = []
  let blankedNumbersForCheck = []
  for (let i = 0; i < newNums.length; i++) {
    const data = newNums[i];
    if(data.type === 'number') {
      numbersIndexes = [...numbersIndexes, i]
    }
  }
  const shuffledIndexes = _.shuffle(numbersIndexes)

  const emptyBlocksIndexes = shuffledIndexes.slice(0, amountOfEmptyBlocks)
  //set emptyBlocks
  for (let i = 0; i < emptyBlocksIndexes.length; i++) {
    const index = emptyBlocksIndexes[i];
    const answer = newNums[index].number
    newNums[index] = {
      type: 'blanked',
      answer,
      number: '',
    }
    blankedNumbersForCheck = [...blankedNumbersForCheck, {
      index,
      answer,
      number: '',
    }]
  }
  return {
    numbersData: newNums,
    blankedNumbersForCheck
  }
}