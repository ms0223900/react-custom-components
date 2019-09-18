import * as ACTIONs from './actionTypes'

export const statsInfo_reducer = (state, action) => {
  const { type, statName, number } = action
  const stat = state.find(stats => stats.statName === statName)
  let newStats = [...state]
  //
  switch (type) {
  case ACTIONs.ADD_STATS: {
    if(stat) {
      const { id, statNumber: originStatNum } = stat
      newStats[id] = {
        ...newStats[id],
        statNumber: originStatNum + number
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