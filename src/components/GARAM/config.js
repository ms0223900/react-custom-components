import _ from 'lodash'

export const cellSize = 50


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
          factorization: ['*', i, j]
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
    const splitNum = String(num).split('')
    return {
      operation,
      numArr: [factor1, factor2, splitNum[0], splitNum[1]]
    }
  })
)