import {
  singleJewelScore,
  scoreMagnification
} from './config'

export const calculateScore = (clearedEmptyJewels) => {
  return singleJewelScore * scoreMagnification(clearedEmptyJewels)
}

