export const jewelWidth = 50
export const jewelsPerRow = 7
export const delayTime = 800
export const emptyColor = 'transparent'
export const jewelColors = ['#0fafad', '#fa0', '#325ca8', '#a83271']
// export const jewelColors = ['#0fafad', '#fa0', '#325ca8', '#a83271', '#b9d104', '#f57e8b', '#b28039']
export const specialJewels = {
  colors: {
    bombColor: '#ddd',
    thunderColor: '#ffd500',
  },
  destroyCount: {
    bombDestroyCount: 2,
    thunderDestroyCount: 5
  } 
}

export const singleJewelScore = 1000
export const scoreMagnification = (count) => {
  if(count > 6) {
    return 1.5
  } else {
    switch (count) {
    case 3:
      return 1
    case 4:
      return 1.1
    case 5:
      return 1.2
    case 6:
      return 1.3
    default:
      return 1
    }
  }
}

export const explodeImgSrc = 'https://cdn4.iconfinder.com/data/icons/explosion/512/as_906-512.png'

const starByScore = [3000, 10000, 20000]
const calculateStar = (score) => {
  return starByScore.filter(sco => score > sco).length
}

const getResult = (score, isPass) => ({
  score,
  isPass,
  star: calculateStar(score)
  //star from star fn
})

export const gameMode = {
  //basic check
  checkBigger: (a, b) => {
    return a >= b
  },
  checkIsFail: (numberNow, maxNumber, score) => {
    if(numberNow > maxNumber) return getResult(score, false)
    return false
  },
  checkScore: (scoreNow, requiredScore) => {
    if(scoreNow >= requiredScore) return getResult(scoreNow, true)
    return false
  },
  checkJewels: (clearedJewels, requiredJewels, scoreNow) => {
    if(clearedJewels >= requiredJewels) return getResult(scoreNow, true)
    return false
  },
  //game mode check
  scoreAndLimitTimeMode(isTimeover, scoreNow, requiredScore) {
    if(isTimeover) {
      const scoreRes = gameMode.checkScore(scoreNow, requiredScore)
      if(scoreRes) return scoreRes
      return getResult(scoreNow, false)
    }
    return false
  },
  scoreAndLimitStepMode(stepNow, limitStep, scoreNow, requiredScore) {
    const stepRes = gameMode.checkIsFail(stepNow, limitStep)
    if(stepRes) return stepRes
    const scoreRes = gameMode.checkScore(scoreNow, requiredScore)
    if(scoreRes) return scoreRes
    return false
  },
  requireJewelsAndLimitStepMode(stepNow, limitStep, clearedJewels, requiredJewels, scoreNow) {
    const stepRes = gameMode.checkIsFail(stepNow, limitStep)
    if(stepRes) return stepRes
    const jewelRes = gameMode.checkJewels(clearedJewels, requiredJewels, scoreNow)
    if(jewelRes) return jewelRes
    return false
  }
}