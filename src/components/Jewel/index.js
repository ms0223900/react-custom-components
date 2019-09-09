/* eslint-disable no-unused-vars */
import React, { useState, forwardRef, useCallback, useRef } from 'react'
import { Container, Box, Button } from '@material-ui/core'
import GameScore from './gameScore'
import { calculateScore } from './fn'
import Jewels from './jewelSquare'
import Timer from '../Timer'
import { getResultScoreStars } from '../GARAM/config'
const { getResultContent } = getResultScoreStars

const timerTime = 600

const JewelGame = ({ 
  mainGameRef,
  overFn, 
}, ref) => {
  const timerRef = useRef()
  const [score, setScore] = useState(0)
  const [isPause, setPause] = useState(true)
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
  return (
    <Container>
      <Box>
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
        <GameScore score={ score } />
        <Jewels 
          ref={ mainGameRef }
          hintMode={ isHint }
          cancelHintFn={ () => setHint(false) }
          isPause={ isPause } 
          setScoreFn={ handleSetScore } />
      </Box>
    </Container>
  )
}

export default forwardRef(JewelGame)