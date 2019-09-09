import React, { useState, useCallback, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Box, makeStyles } from '@material-ui/core'
import { FlashOn, Whatshot } from '@material-ui/icons'
import {
  jewelWidth,
  jewelsPerRow,
  emptyColor,
  jewelColors,
  specialJewelColors
} from './config'
import TwoPointSlash from './twoPointSlash'

const generateJewels = () => {
  return [...Array(jewelsPerRow * jewelsPerRow * 2).keys()]
    .map(id => ({
      id: id - jewelsPerRow * jewelsPerRow,
      type: 'jewel',
      color: jewelColors[~~(Math.random() * jewelColors.length)],
      hint: false,
    }))
}

const getNumsSmaller = (num, intervalNum) => {
  let res = [num]
  let next = num - intervalNum
  while(next >= 0) {
    res = [...res, next]
    next -= intervalNum
  }
  return res
}

const checkJewelIs4Dir = (idx, newIndex) => {
  const prevIndex = idx
  const lastIndexPerRow = jewelsPerRow - 1
  if(newIndex + jewelsPerRow === prevIndex || newIndex - jewelsPerRow === prevIndex) {
    return true
  } else if((prevIndex % jewelsPerRow !== 0 && prevIndex % jewelsPerRow !== lastIndexPerRow) && (prevIndex + 1 === newIndex || prevIndex - 1 === newIndex)) {
    return true
  } else if(prevIndex % jewelsPerRow === 0 && prevIndex + 1 === newIndex) {
    return true
  } else if(prevIndex % jewelsPerRow === lastIndexPerRow && prevIndex - 1 === newIndex) {
    return true
  }
  return false 
}

const getJewelPos = (idx, width=jewelWidth) => ({
  left: ~~(idx % jewelsPerRow) * width,
  top: ~~(idx / jewelsPerRow) * width
})

const exchangedJewels = (idx1, idx2, jewelData) => {
  let newJewelData = [...jewelData]
  const jewel1 = jewelData[idx1]
  const jewel2 = jewelData[idx2]
  newJewelData[idx1] = jewel2
  newJewelData[idx2] = jewel1
  return newJewelData
}

const checkIsFulfill = (index, jewelAddCount, jewelData) => {
  let sameColorCount = 1
  let jewelIndex = index
  let checkFulfills = [jewelIndex]
  let nextIndex = jewelIndex + jewelAddCount
  const { type, color } = jewelData[index]
  // console.log(jewelIndex + jewelAddCount)
  while(jewelData[nextIndex] && jewelData[nextIndex].color === color && type !== 'empty') {
    sameColorCount += 1
    checkFulfills = [...checkFulfills, nextIndex]
    nextIndex += jewelAddCount
  }
  if(sameColorCount > 2) {
    return checkFulfills
    // console.log(fulfilledJewels)
    // return true
  }
  return []
}

const getThunderPoints = (center, others) => {
  return others.map(other => ({
    point1: {
      left: getJewelPos(center).left + jewelWidth / 2,
      top: getJewelPos(center).top + jewelWidth / 2,
    },
    point2: {
      left: getJewelPos(other).left + jewelWidth / 2,
      top: getJewelPos(other).top + jewelWidth / 2,
    },
  }))
}

const useStyles = makeStyles({
  root: {
    display: 'inline-block',
    padding: 6,
    border: '4px solid #111',
    borderRadius: 10,
  },
  jewelContainer: {
    position: 'relative',
    width: jewelsPerRow * jewelWidth,
    height: jewelsPerRow * jewelWidth,
    overflow: 'hidden',
  },
  singleJewel: {
    backgroundColor: props => props.color, 
    position: 'absolute',
    top: props => props.pos && (props.pos.top - jewelsPerRow * jewelWidth),
    left: props => props.pos && props.pos.left,
    width: jewelWidth - 2, 
    height: jewelWidth - 2,
    border: props => props.isChosen ? '3px solid #111' : '1px solid #fff',
    borderRadius: props => props.hint ? 100 : 6,
    boxSizing: 'border-box',
    textAlign: 'center',
    transition: '0.3s',
    '& svg': {
      fontSize: '2.5em',
    }
  }
})

const SingleJewel = ({ jewelInfo, pos, isChosen, getIdFn }) => {
  const { color, type, hint } = jewelInfo
  const classes = useStyles({ ...jewelInfo, pos, isChosen })
  const Icon = ({ type }) => {
    if(type === 'thunder') {
      return <FlashOn />
    } else if(type === 'bomb') {
      return <Whatshot />
    }
    return null
  }
  return (
    <Box onClick={ getIdFn } className={ classes.singleJewel }>
      { <Icon type={ type } /> }
    </Box>
  )
}

const Jewels = ({ 
  isPause, 
  hintMode=true,
  cancelHintFn,
  setScoreFn
}, ref) => {
  const classes = useStyles()
  const [thunderIdxs, setThunderIdxs] = useState({
    center: 3,
    otherPoints: [0, 4, 12, 18] 
  })
  const [jewelData, setJewelData] = useState(generateJewels())
  const [twoJewelsIndex, settwoJewelsIndex] = useState([])
  const getJewelId = useCallback((newIndex) => {
    const checkNotSame = !twoJewelsIndex.find(idx => idx === newIndex)
    //
    const checkHaveEmpty = jewelData.find(data => data.type === 'empty')
    if(newIndex >= jewelsPerRow * jewelsPerRow && !checkHaveEmpty && !isPause) {
      if(twoJewelsIndex.length < 1) {
        settwoJewelsIndex([newIndex])
      } else if(!checkNotSame) {
        settwoJewelsIndex([])
      } else if( checkNotSame && checkJewelIs4Dir(twoJewelsIndex[0], newIndex) ) {
        settwoJewelsIndex(index => [
          ...index,
          newIndex
        ])
      }
    }
  }, [isPause, twoJewelsIndex, jewelData])
  //handle exchange jewels
  useEffect(() => {
    if(twoJewelsIndex.length === 2) {
      // console.log(twoJewelsIndex.length)
      const [index1, index2] = twoJewelsIndex
      const newJewelData = exchangedJewels(index1, index2, jewelData)
      setJewelData(newJewelData)
      // console.log(newJewelData)
      return settwoJewelsIndex([])
    }
  }, [twoJewelsIndex])
  //handle check is fulfill 3 disappear condition
  useEffect(() => {
    let newJewelData = [...jewelData]
    // let fulfilledJewels = []
    let emptyJewelsIdx = []
    jewelData.forEach((j, idx) => {
      if(j.type === 'empty') {
        emptyJewelsIdx = [...emptyJewelsIdx, idx]
      }
    })

    //update empty jewels to new jewels
    if(emptyJewelsIdx.length > 0) {
      // let exchanged = false
      // console.log(newJewelData)
      for (let i = 0; i < emptyJewelsIdx.length; i++) {
        // let emptyIdx = emptyJewelsIdx[i]
        const thisRowIdx = emptyJewelsIdx[i]
        const emptyUpRowJewels = getNumsSmaller(thisRowIdx, jewelsPerRow)
        const jewelsUpRow = emptyUpRowJewels.slice(1).map(idx => {
          return newJewelData[idx]
        }) // remove first empty index
        const emptyLastIdx = emptyUpRowJewels[emptyUpRowJewels.length - 1]
        const newJewel = {
          id: newJewelData[emptyLastIdx].id - jewelsPerRow,
          type: 'jewel',
          color: jewelColors[~~(Math.random() * 4)],
          hint: false,
        }
        const newJewelsUpRow = [...jewelsUpRow, newJewel]
        // console.log(emptyUpRowJewels, newJewelsUpRow)
        emptyUpRowJewels.forEach((jewelIdx, i) => {
          newJewelData[jewelIdx] = newJewelsUpRow[i]
        })
      }
      cancelHintFn && cancelHintFn()
      setTimeout(() => {
        setJewelData(newJewelData)
      }, 500)
    } else {  //check have fulfill jewels
      let fulfilledJewels = []
      for (let i = jewelsPerRow * 5; i < jewelData.length; i++) { //
        fulfilledJewels = [...fulfilledJewels, ...checkIsFulfill(i, jewelsPerRow, jewelData)]
        //row(expect last 2 jewels)
        if(i % 5 !== 3 && i % 5 !== 4) {
          fulfilledJewels = [...fulfilledJewels, ...checkIsFulfill(i, 1, jewelData)]
          // rowRes = checkIsFulfill(i, 1) 
        }
        if(fulfilledJewels.length > 0) break
      }
      //set fulfill jewels to empty or special jewels
      const fulfilledJewelsCount = fulfilledJewels.length
      if(fulfilledJewelsCount > 0) {

        console.log(fulfilledJewels)
        for (let i = 0; i < fulfilledJewelsCount; i++) {
          //trigger special jewels at same time, set to empty blocks
          //check is special jewels is around fulfilled jewels

          

          //set empty jewels or bomb jewel
          const idx = fulfilledJewels[i];
          newJewelData[idx] = {
            ...jewelData[idx],
            type: 'empty',
            color: emptyColor,
          }
          if(fulfilledJewelsCount >= 5 && i === fulfilledJewelsCount - 1) { //thunder jewel
            newJewelData[idx] = {
              ...jewelData[idx],
              type: 'thunder',
              color: specialJewelColors.thunderColor,
            }
          } else if(fulfilledJewelsCount >= 4 && i === fulfilledJewelsCount - 1) { //bomb jewel
            newJewelData[idx] = {
              ...jewelData[idx],
              type: 'bomb',
              color: specialJewelColors.bombColor,
            }
          }
        }
        setScoreFn && setScoreFn(fulfilledJewelsCount)
        setJewelData(newJewelData)
      }
    }
  }, [jewelData])
  useEffect(() => {
    let newJewelData = [...jewelData]
    if(hintMode) {
      const jewelIdxs = [...Array(jewelsPerRow * jewelsPerRow * 2).keys()]
      let fulfilledJewels = []
      for (let idx1 = jewelsPerRow * 5; idx1 < jewelData.length; idx1++) {
        // const jewel = jewelData[i]
        const dir4JewelsIndexes = jewelIdxs.filter(idx => {
          return checkJewelIs4Dir(idx1, idx) && idx >= jewelsPerRow * 5
        })
        // console.log('index: ' + i + ', dir4JewelsIndexes: ' + dir4JewelsIndexes)

        //exchange 4 direction jewels to check is fulfill
        for (let j = 0; j < dir4JewelsIndexes.length; j++) {
          const idx2 = dir4JewelsIndexes[j]
          const exchangedData = exchangedJewels(idx1, idx2, jewelData)
          //check whether is fulfill
          for (let k = jewelsPerRow * 5; k < exchangedData.length; k++) {
            fulfilledJewels = [...fulfilledJewels, ...checkIsFulfill(k, jewelsPerRow, exchangedData)]
            //row(expect last 2 jewels)
            if(k % 5 !== 3 && k % 5 !== 4) {
              fulfilledJewels = [...fulfilledJewels, ...checkIsFulfill(k, 1, exchangedData)]
              // rowRes = checkIsFulfill(i, 1) 
            }
          }
        }
        if(fulfilledJewels.length > 0) {
          // console.log('fulfilledJewels: ' + fulfilledJewels)
          fulfilledJewels.forEach(idx => {
            newJewelData[idx] = {
              ...jewelData[idx],
              hint: true,
            }
          })
          break
        }
      }
    } else {
      newJewelData = newJewelData.map(data => ({
        ...data,
        hint: false,
      }))
    }
    setJewelData(newJewelData)
  }, [hintMode])
  //
  useImperativeHandle(ref, () => ({
    handleNext: () => {
      setJewelData(generateJewels())
      settwoJewelsIndex([])
    },
  }))
  const thunderPoints = getThunderPoints(thunderIdxs.center, thunderIdxs.otherPoints)
  console.log(thunderPoints)
  return (
    <Box className={ classes.root }>
      <Box className={ classes.jewelContainer }>
        {jewelData.map((data, index) => (
          <SingleJewel 
            key={ data.id }
            jewelInfo={ data }
            isChosen={ twoJewelsIndex.find(idx => idx === index) }
            pos={ getJewelPos(index, jewelWidth) } 
            getIdFn={ () => { getJewelId(index) } } />
        ))}
        {thunderPoints.map(pts => (
          <TwoPointSlash point1={pts.point1} point2={pts.point2} />
        ))}
      </Box>
      
    </Box>
  )
}

export default forwardRef(Jewels)