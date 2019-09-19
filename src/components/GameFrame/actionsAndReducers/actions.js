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

export const buyItem = (id, count) => ({
  type: ACTIONs.BUY_ITEM,
  id,
  count,
})

export const consumeItem = (id, count=1) => ({
  type: ACTIONs.CONSUME_ITEM,
  id,
  count,
})
