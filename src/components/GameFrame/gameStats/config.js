export const allStats = {
  life: 'life',
  coin: 'coin',
  level: 'level',
  exp: 'exp',
}

export const lifeMax = 10
export const lifeRecoverMinutes = 5
const levelBaseExp = 100
export const getLevelUpExp = (level) => {
  return ~~(levelBaseExp * Math.pow(1.2, level))
}
export const getLevelUpCount = (levelNow, expNow) => {
  let levelUpCount = 0
  let level = levelNow
  let exp = expNow
  let levelUpExpNow = getLevelUpExp(level)
  while(exp - levelUpExpNow >= 0) {
    exp -= levelUpExpNow
    levelUpCount += 1
    level += 1
    levelUpExpNow = getLevelUpExp(level)
  }
  return {
    levelUpCount,
    remainExp: exp,
  }
}

export const statsInfo_init = [
  {
    id: 0,
    statName: allStats.life,
    statNumber: lifeMax,
  },
  {
    id: 1,
    statName: allStats.coin,
    statNumber: 0,
  },
  {
    id: 2,
    statName: allStats.level,
    statNumber: 10, //exp to level
  },
  {
    id: 3,
    statName: allStats.exp,
    statNumber: 0, //exp to level
  },
]