import * as ACTIONs from './actionTypes'

export const statsInfo_reducer = (state, action) => {
  const { type, statName, number } = action
  const { id, statNumber: originStatNum } = 
    state.find(stats => stats.statName === statName)
  let newStats = [...state]
  //
  switch (type) {
  case ACTIONs.ADD_STATS: {
    newStats[id] = {
      ...newStats[id],
      statNumber: originStatNum + number
    }
    return newStats
  }
  case ACTIONs.MINUS_STATS: {
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
  default:
    return state
  }
}