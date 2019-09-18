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
  if(gameOriginInfo && gameReq) {
    const { 
      score, 
      movedStep, 
      isTimeover, 
      remainRequireJewels 
    } = gameOriginInfo
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
    if(limitTime && remainRequireJewels.length > 0) {
      return gameMode.requireJewelsAndLimitTimeMode(isTimeover, remainRequireJewels, score)
    }
  }
  return false
}