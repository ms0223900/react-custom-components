import * as ACTIONs from './actionTypes'
import { allStats, getLevelUpCount } from '../gameStats/config'

export const statsInfo_reducer = (state, action) => {
  const { type, statName, number } = action
  const stat = state.find(stats => stats.statName === statName)
  let newStats = [...state]
  //
  switch (type) {
  case ACTIONs.ADD_STATS: {
    if(stat) {
      const { id, statNumber: originStatNum } = stat
      let newNumber = originStatNum + number
      if(stat.statName === allStats.exp) {
        const levelStat = state.find(stats => stats.statName === allStats.level)
        const { statNumber: level, id: levelId } = levelStat
        //level up
        const { levelUpCount, remainExp } = getLevelUpCount(level, newNumber)
        newStats[levelId] = {
          ...newStats[levelId],
          statNumber: level + levelUpCount
        }
        newNumber = remainExp
      }
      newStats[id] = {
        ...newStats[id],
        statNumber: newNumber
      }
      return newStats
    }
    return state
  }
  case ACTIONs.MINUS_STATS: {
    if(stat) {
      const { id, statNumber: originStatNum } = stat
      const { statsMinimumFn } = action
      const newNumber = originStatNum - number
      if(newNumber < 0) {
        statsMinimumFn && statsMinimumFn()
        return state
      } else {
        newStats[id] = {
          ...newStats[id],
          statNumber: newNumber
        }
        return newStats
      }
    }
    return state
  }
  default:
    return state
  }
}

export const shopList_reducer = (state, action) => {
  const { type, id, count } = action
  const item = state.find(item => item.id === id)
  let newShopList = [...state]
  switch (type) {
  case ACTIONs.BUY_ITEM: {
    const { itemCount } = item
    newShopList[id] = {
      ...newShopList[id],
      itemCount: itemCount + count
    }
    return newShopList
  }
  case ACTIONs.CONSUME_ITEM: {
    const { itemCount } = item
    const newAmount = itemCount - count
    if(newAmount >= 0) {
      newShopList[id] = {
        ...newShopList[id],
        itemCount: newAmount
      }
      return newShopList
    } return state
  }
  default:
    return state
  }
}