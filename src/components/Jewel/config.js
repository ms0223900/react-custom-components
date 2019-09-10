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

const getResult = (score, isPass) => ({
  score,
  isPass,
})

export const gameMode = {
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
    return 
  },
  scoreAndLimitTimeMode: (timeNow, limitTime, scoreNow, requiredScore) => {
    const timeRes = this.checkIsFail(timeNow, limitTime, scoreNow)
    if(timeRes) return timeRes
    const scoreRes = this.checkScore(scoreNow, requiredScore)
    if(scoreRes) return scoreRes
    return false
  },
  scoreAndLimitStepMode: (stepNow, limitStep, scoreNow, requiredScore) => {
    const stepRes = this.checkIsFail(stepNow, limitStep)
    if(stepRes) return stepRes
    const scoreRes = this.checkScore(scoreNow, requiredScore)
    if(scoreRes) return scoreRes
    return false
  },
  requireJewelsAndLimitStepMode: (stepNow, limitStep, clearedJewels, requiredJewels, scoreNow) => {
    const stepRes = this.checkIsFail(stepNow, limitStep)
    if(stepRes) return stepRes
    return false
  }
}