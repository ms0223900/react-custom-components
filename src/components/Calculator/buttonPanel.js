import React, { useCallback, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import Paper from '@material-ui/core/Paper'
import SingleButton from './singleButton'

const buttonNumberTexts = [...Array(10).keys()].map(a => a.toString())
const buttonCalTexts = ['+', '-', '/', '*']
const buttonFuncTexts = ['del', 'clear', '=']
const buttonTexts = [...buttonNumberTexts, ...buttonCalTexts, ...buttonFuncTexts]
const useStyles = makeStyles({
  calContainer: {
    maxWidth: 300,
    minHeight: 40,
    padding: 10,
    whiteSpace: 2,
    textAlign: 'right'
  }
})

const arrDel = (arr) => arr.slice(0, -1)
const checkIsNum = (txt) => buttonNumberTexts.includes(txt)
const checkIsOpe = (txt) => buttonCalTexts.includes(txt)

export default () => {
  const classes = useStyles()
  const [calNow, setCalNow] = useState(['0'])
  const [isCalRes, setCalRes] = useState(false)
  //
  const handleEqualFunc = useCallback(() => {
    if( buttonCalTexts.includes(calNow[0]) ) {
      return setCalNow([0])
    }
    //
    // const res = 0
    const numbers = []
    const operations = []
    let numI = 0
    let opeI = 0
    let handledOperations = []
    let handledNumbers = []
    calNow.map(txt => {
      if( !isNaN(Number(txt)) ) {
        numbers[numI] = numbers[numI] ? numbers[numI] + txt : txt
      } else {
        operations[opeI] = txt
        numI += 1
        opeI += 1
      }
    })
    handledOperations = operations.length === numbers.length ? operations.slice(0, -1) : operations
    handledNumbers = numbers
    console.log(numbers, operations)
    //
    let a = 0
    let checkOpI = 0
    const update = (res) => {
      handledNumbers = [...handledNumbers.slice(0, checkOpI), res, ...handledNumbers.slice(checkOpI + 2)]
      handledOperations = [...handledOperations.slice(0, checkOpI), ...handledOperations.slice( checkOpI + 1)]
    }
    while(handledOperations.length > 0) {
      a ++
      if(a > 50) break
      console.log(checkOpI)
      let res = 0
      const op = handledOperations[checkOpI]
      const num = Number(handledNumbers[checkOpI])
      const numNext = Number(handledNumbers[checkOpI + 1])
      if(handledOperations.includes('*') || handledOperations.includes('/')) {
        if(op === '*') {
          res = num * numNext
          update(res)
          checkOpI = 0
          continue
        } else if(op === '/') {
          res = num / numNext
          update(res)
          checkOpI = 0
          continue
        } else {
          checkOpI ++
          continue
        }
      } else {
        if(op === '+') {
          res = num + numNext
          update(res)
        } else {
          res = num - numNext
          update(res)
        }
      } 
      if(checkOpI === handledOperations.length || handledOperations.length === 1) {
        checkOpI = 0
      } else {
        checkOpI ++
      }
      console.log(num, numNext)
      console.log(handledNumbers, handledOperations)
    }
    //
    setCalRes(true)
    setCalNow(handledNumbers.map(a => a.toString()))
    //
  }, [calNow])


  const handleCalcFunc = useCallback((txt) => {
    const lastTxt = calNow[calNow.length - 1]
    switch (txt) {
      case 'del':
        if(calNow.length > 0) {
          if(checkIsOpe(lastTxt)) {
            setCalNow( arrDel(calNow) )
          } else {
            if(lastTxt.length === 1) {
              setCalNow( calNow.slice(0, -1) )
            } else {
              const res = lastTxt.slice(0, -1)
              setCalNow( [...calNow.slice(0, -2), res] )
            }
          }
        } else {
          setCalNow(['0'])
        }
        break
      case 'clear':
        setCalNow(['0'])
        break
      case '=':
        return handleEqualFunc()
      default:
        return 
    }
  }, [calNow])
  const handleButton = useCallback((txt) => {
    const lastTxt = calNow[calNow.length - 1]
    if(checkIsNum(txt) || checkIsOpe(txt)) {
      setCalRes(false) //reset calculator 
      // + - * /
      if(calNow[0] === '0' || isCalRes) {
        if(checkIsNum(txt)) {
          setCalNow([txt])
        } else {
          setCalNow([ ...calNow, txt ])
        }
        return 
      }
      //operations
      if(checkIsOpe(lastTxt)) {
        //if num is not typed
        if(calNow.length === 1 && lastTxt === '0') {
          setCalNow([ txt ])
        } else if(checkIsNum(txt)) {
          setCalNow([ ...calNow, txt ])
        } else {
          setCalNow([ ...arrDel(calNow), txt ])
        }
      // numbers
      } else {
        if( checkIsOpe(txt) ) {
          setCalNow([ ...calNow, txt ])
        } else {
          const res = lastTxt + txt
          setCalNow([ ...calNow.slice(0, -1), res ])
        }
      }
    } else if(buttonFuncTexts.includes(txt)) {
      handleCalcFunc(txt)
    }
  }, [calNow])
  useEffect(() => {
    console.log(calNow)
  }, [calNow])
  //
  return (
    <div className={ classes.calContainer }>
      <Paper>
        { calNow.join('') }
      </Paper>
      {buttonTexts.map(txt => (
        <SingleButton 
          key={ txt }
          btnText={ txt } 
          btnFn={ handleButton.bind(this, txt) } />
      ))}
    </div>
  )
}