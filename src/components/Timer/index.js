import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react'
import NormalTimerLayout from './normalTimerLayout'
import LittleTimerLayout from './littleTimerLayout'

const mockFn = () => {
  window.alert('time out!')
}

const Timer = ({ 
  timerRef,
  timeoutFn=mockFn, 
  time=333, 
  isPause, 
  countDown=true,
  LayoutComponent, 
}) => {
  const thisTimer = useRef()
  const [timeNow, setTimeNow] = useState(time)
  useEffect(() => {
    if(countDown && timeNow === 0) {
      timeoutFn && timeoutFn()
      setTimeNow(time)
    }
    if(!isPause) {
      const newTime = countDown ? timeNow - 1 : timeNow + 1
      thisTimer.current = setInterval(() => {
        setTimeNow(newTime)
      }, 1000)
      // console.log(document.hidden)
      return () => clearInterval(thisTimer.current)
    }
  }, [timeNow, isPause])
  //
  useImperativeHandle(timerRef, () => ({
    resetTimer() {
      setTimeNow(time)
    },
    getTimerTime() {
      return timeNow
    }
  }))
  return (
    <LayoutComponent timeNow={ timeNow } />
  )
}

const TimerWithLayout = (LayoutComponent) => {
  return forwardRef((props, ref) => {
    return (
      <Timer 
        {...props} 
        timerRef={ ref }
        LayoutComponent={ LayoutComponent } />
    )
  })
}

export const NormalTimer = TimerWithLayout(NormalTimerLayout)
export const LittleTimer = TimerWithLayout(LittleTimerLayout)

export default NormalTimer
