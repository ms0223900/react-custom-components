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
  checkJewels: (remainRequireJewels, scoreNow) => {
    if(!remainRequireJewels.find(jwl => jwl.amount > 0)) return getResult(scoreNow, true)
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
    if(scoreRes && gameMode.checkBigger(stepNow, limitStep)) return scoreRes
    return false
  },
  requireJewelsAndLimitStepMode(stepNow, limitStep, remainRequireJewels, scoreNow) {
    const stepRes = gameMode.checkIsFail(stepNow, limitStep)
    if(stepRes) return stepRes
    if(gameMode.checkBigger(stepNow, limitStep)) {
      const jewelRes = gameMode.checkJewels(remainRequireJewels, scoreNow)
      if(jewelRes) return jewelRes
    }
    return false
  },
  requireJewelsAndLimitTimeMode(isTimeover, remainRequireJewels, scoreNow) {
    if(isTimeover) {
      const jewelRes = gameMode.checkJewels(remainRequireJewels, scoreNow)
      if(jewelRes) return jewelRes
      return getResult(scoreNow, false)
    }
    return false
  },
}

// schema
// const gameRequirement_mockData = {
//   requireScore: 0,
//   limitStep: 0,
//   requireJewels: [
//     { color: '', amount: 0 },
//   ],
//   limitTime: 0
// }

export const gameRequirements_mockData = [
  {
    requireScore: 5000,
    limitStep: 3,
    // requireJewels
  },
  {
    requireScore: 10000,
    limitTime: 10,
  },
  {
    limitTime: 20,
    requireJewels: [
      { color: jewelColors[0], amount: 10 },
      { color: jewelColors[1], amount: 3 },
      { color: jewelColors[2], amount: 7 },
    ],
  },
  {
    requireScore: 1000,
    limitTime: 5,
  },
  ...[...Array(27).keys()],
]