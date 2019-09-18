import * as ACTIONs from './actionTypes'

export const addStats = (statName, number) => ({
  type: ACTIONs.ADD_STATS,
  statName,
  number
})

export const minusStats = (statName, number, statsMinimumFn) => ({
  type: ACTIONs.MINUS_STATS,
  statName,
  number,
  statsMinimumFn
})
