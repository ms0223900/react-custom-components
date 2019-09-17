/* eslint-disable no-unused-vars */
import React, { useState, forwardRef, useCallback, useRef, useEffect, useImperativeHandle } from 'react'
import { Container, Box, Button, Typography, makeStyles } from '@material-ui/core'
import GameText from './gameScore'
import { 
  calculateScore,
  checkRequirements, 
} from './fn'
import Jewels from './jewelSquare'
import Timer from '../Timer'
import { getResultScoreStars } from '../GARAM/config'
import { 
  jewelColors,
  jewelWidth, 
  jewelsPerRow,
  gameMode 
} from './config'
import JewelsRequirePart from './jewelsRequirePart'

const { getResultContent } = getResultScoreStars

const timerTime = 666 //s
const comboTimeout = 3000 //ms
const comboAddScoreMagnification = 50
const clearedJewelsByColors_init = jewelColors.map(color => ({
  color,
  amount: 0,
}))

const useStyles = makeStyles({
  comboAddScore: {
    position: 'absolute',
    top: 2,
    left: 55
  }
})


const JewelGame = ({ 
  mainGameRef,
  overFn,
  setLevelDataFn,
  gameRequirements,
}, ref) => {
  const classes = useStyles()
  const comboTimeoutRef = useRef()
  const timerRef = useRef()
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [movedStep, setStep] = useState(0)
  const [clearedJewels, setJewels] = useState(clearedJewelsByColors_init)
  const [remainRequireJewels, setRemains] = useState([])
  const [isPause, setPause] = useState(false)
  const [isTimeover, setTimeover] = useState(false)
  const [isHint, setHint] = useState(false)

  const handleSetScore = jewelCount => {
    setScore(score => score + calculateScore(jewelCount))
  }

  const handleResetGame = useCallback(() => {
    setTimeover(false)
    setPause(true)
    setScore(0)
    setCombo(0)
    setStep(0)
    setJewels(clearedJewelsByColors_init)
    timerRef && timerRef.current.resetTimer()
    clearTimeout(comboTimeoutRef.current)
  }, [])

  const handleGameOver = useCallback(result => {
    overFn && overFn(result)
    handleResetGame()
  }, [overFn])

  const handleSetCombo = useCallback(newCombo => {
    setCombo(c => c + newCombo)
  }, [combo])

  const handleSetJewels = useCallback(newJewels => {
    let newClearedJewels = [...clearedJewels]
    // console.log('new jewels from jewel game: ', newJewels)
    newJewels.forEach(jewel => {
      const { color, amount } = jewel
      const idx = clearedJewels.findIndex(jwl => jwl.color === color)
      newClearedJewels[idx] = {
        ...newClearedJewels[idx],
        amount: newClearedJewels[idx].amount + amount
      }
    })
    // console.log(newClearedJewels)
    setJewels(newClearedJewels)
  }, [clearedJewels])
  //
  useEffect(() => {
    if(combo > 0) {
      comboTimeoutRef.current && clearTimeout(comboTimeoutRef.current)
      comboTimeoutRef.current = setTimeout(() => {
        combo > 10 && setScore(score => {
          return score + combo * comboAddScoreMagnification
        })
        setCombo(0)
      }, comboTimeout)
    }
  }, [combo])
  useEffect(() => {
    if(gameRequirements && gameRequirements.requireJewels) {
      const { requireJewels } = gameRequirements
      const remainJewels = requireJewels.map(jwl => {
        const { color, amount } = jwl
        const jewelsAmountByColor = clearedJewels.find(jewel => jewel.color === color).amount
        const remainJewels = amount - jewelsAmountByColor
        return ({
          color,
          amount: remainJewels >= 0 ? remainJewels : 0
        })
      })
      setRemains(remainJewels)
    }
  }, [clearedJewels])
  //check result
  useEffect(() => {
    const originGameInfo = { score, movedStep, isTimeover, remainRequireJewels }
    const result = checkRequirements(originGameInfo, gameRequirements)
    // console.log(originGameInfo, result)
    //time limit requirement
    if(overFn && result) {
      setLevelDataFn(result)
      handleGameOver(result)
    }
  }, [score, isTimeover, movedStep, remainRequireJewels])
  useImperativeHandle(ref, () => ({
    startGame: () => {
      setPause(false)
    },
  }))
  //
  const isLimitTime = gameRequirements && gameRequirements.limitTime ? gameRequirements.limitTime : false
  return (
    <Container>
      <Box width={ jewelWidth * jewelsPerRow }>
        <Box>
          <Timer 
            timeoutFn={ () => setTimeover(true) }
            time={ isLimitTime || 0 } 
            countDown={ isLimitTime }
            isPause={ isPause }
            ref={ timerRef } />
          <Button onClick={ () => setPause(!isPause) }>
            { isPause ? 'start' : 'pause' }
          </Button>
        </Box>
        <Button
          variant={ 'contained' }
          color={ isHint ? 'primary' : 'default' } 
          onClick={() => setHint(!isHint)}>
          { 'hint' }
        </Button>
        <Box>
          <JewelsRequirePart jewels={ remainRequireJewels } />
        </Box>
        <hr />
        <Box 
          position={ 'relative' }
          display={'flex'} 
          justifyContent={ 'space-between' }
        >
          {combo > 10 && (
            <Typography className={ classes.comboAddScore }>
              { `+${ combo * comboAddScoreMagnification }` }
            </Typography>
          )}
          <GameText title={'score'} text={ score } />
          <GameText title={'step: '} text={ movedStep } />
          <GameText title={'combo'} text={ `X ${combo}` } />
        </Box>
        <Jewels 
          ref={ mainGameRef }
          hintMode={ isHint }
          cancelHintFn={ () => setHint(false) }
          isPause={ isPause } 
          setJewelsFn={ handleSetJewels }
          setStepFn={ setStep }
          setComboFn={ handleSetCombo }
          setScoreFn={ handleSetScore } />
      </Box>
    </Container>
  )
}

export default forwardRef(JewelGame)