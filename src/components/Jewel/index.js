/* eslint-disable no-unused-vars */
import React, { useState, forwardRef, useCallback, useRef, useEffect } from 'react'
import { Container, Box, Button, Typography, makeStyles } from '@material-ui/core'
import GameText from './gameScore'
import { calculateScore } from './fn'
import Jewels from './jewelSquare'
import Timer from '../Timer'
import { getResultScoreStars } from '../GARAM/config'
import { jewelWidth, jewelsPerRow } from './config'
const { getResultContent } = getResultScoreStars

const timerTime = 600 //s
const comboTimeout = 3000 //ms
const comboAddScoreMagnification = 50

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
}, ref) => {
  const classes = useStyles()
  const comboTimeoutRef = useRef()
  const timerRef = useRef()
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [movedStep, setStep] = useState(0)
  const [isPause, setPause] = useState(false)
  const [isHint, setHint] = useState(false)
  const handleSetScore = jewelCount => {
    setScore(score => score + calculateScore(jewelCount))
  }
  const handleGameOver = useCallback(() => {
    setPause(true)
    timerRef && timerRef.current.resetTimer()
    setScore(0)
    overFn && overFn({
      level: 'no',
      score,
    })
  }, [score])
  const handleSetCombo = useCallback(newCombo => {
    setCombo(c => c + newCombo)
  }, [combo])
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
  return (
    <Container>
      <Box width={ jewelWidth * jewelsPerRow }>
        <Box>
          <Timer 
            timeoutFn={ handleGameOver }
            time={ timerTime } 
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
          setStepFn={ setStep }
          setComboFn={ handleSetCombo }
          setScoreFn={ handleSetScore } />
      </Box>
    </Container>
  )
}

export default forwardRef(JewelGame)