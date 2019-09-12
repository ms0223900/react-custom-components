/* eslint-disable no-unused-vars */
import {
  singleJewelScore,
  scoreMagnification
} from './config'
import { gameMode } from './config'

export const calculateScore = (clearedEmptyJewels) => {
  return singleJewelScore * scoreMagnification(clearedEmptyJewels)
}

export const checkRequirements = (gameOriginInfo, gameReq) => {
  const { score, movedStep, isTimeover } = gameOriginInfo
  const {
    requireScore,
    limitStep,
    requireJewels,
    limitTime
  } = gameReq
  if(requireScore && !limitStep) {
    return gameMode.scoreAndLimitTimeMode(isTimeover, score, requireScore)
  }
  if(requireScore && limitStep) {
    return gameMode.scoreAndLimitStepMode(movedStep, limitStep, score, requireScore)
  }
  return false
}