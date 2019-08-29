export const initLevelData = (levelCount) => (
  [...Array(levelCount).keys()].map(lvl => ({
    id: lvl,
    level: lvl + 1,
    star: 0
  }))
)
