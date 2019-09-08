import React, { useRef, useState, useCallback, forwardRef, useImperativeHandle, useEffect } from 'react'
import { Box, makeStyles } from '@material-ui/core'

const jewelWidth = 50
const jewelsPerRow = 5
const emptyColor = '#fff'
const jewelColors = ['#0fafad', '#fa0', '#325ca8', '#a83271']

// const jewelsData_init = [
//   { id: 0, color: '#f00', },
//   { id: 1, color: '#00f', },
//   { id: 2, color: '#0fa', },
//   { id: 3, color: '#f00', },
//   { id: 4, color: '#00f', },
//   { id: 5, color: '#0fa', },
// ]

const generateJewels = () => {
  return [...Array(jewelsPerRow * jewelsPerRow).keys()]
    .map(id => ({
      id: id,
      type: 'jewel',
      color: jewelColors[~~(Math.random() * 4)]
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

const jewelsData_init = [
  { id: 0, color: '#0fafad', },
  { id: 1, color: '#0fafad', },
  { id: 2, color: '#f00', },
  { id: 3, color: '#0fafad', },
  { id: 4, color: '#00f', },
  { id: 5, color: '#0fa', },
  { id: 6, color: '#0fafad', },
  { id: 7, color: '#0fafad', },
  { id: 8, color: '#f00', },
  { id: 9, color: '#00f', },
]

const getJewelPos = (id, width) => ({
  left: ~~(id % jewelsPerRow) * width,
  top: ~~(id / jewelsPerRow) * width
})

const useStyles = makeStyles({
  jewelContainer: {
    position: 'relative',
  },
  singleJewel: {
    backgroundColor: props => props.color, 
    position: 'absolute',
    top: props => props.pos.top,
    left: props => props.pos.left,
    width: jewelWidth - 2, 
    height: jewelWidth - 2,
    border: props => props.isChosen ? '3px solid #111' : '1px solid #fff',
    borderRadius: 6,
    boxSizing: 'border-box',
    // transform: props => `translate(${props.pos.left}px, ${props.pos.top}px)`,
    transition: '0.3s'
  }
})

const SingleJewel = ({ pos, color, isChosen, getIdFn }) => {
  const classes = useStyles({ color, pos, isChosen })
  return (
    <Box onClick={ getIdFn } className={ classes.singleJewel }></Box>
  )
}

const Jewels = () => {
  const [jewelData, setJewelData] = useState(generateJewels())
  const [twoJewelsIndex, settwoJewelsIndex] = useState([])
  const getJewelId = useCallback((newIndex) => {
    const checkNotSame = !twoJewelsIndex.find(idx => idx === newIndex)
    const checkIs4Dir = () => {
      const prevIndex = twoJewelsIndex[0]
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
    if(twoJewelsIndex.length < 1) {
      settwoJewelsIndex([newIndex])
    } else if(!checkNotSame) {
      settwoJewelsIndex([])
    } else if( checkNotSame && checkIs4Dir() ) {
      settwoJewelsIndex(index => [
        ...index,
        newIndex
      ])
    }
  }, [twoJewelsIndex])
  //handle exchange jewels
  useEffect(() => {
    if(twoJewelsIndex.length === 2) {
      console.log(twoJewelsIndex.length)
      const [index1, index2] = twoJewelsIndex
      let newJewelData = [...jewelData]
      const jewel1 = jewelData[index1]
      const jewel2 = jewelData[index2]
      newJewelData[index1] = jewel2
      newJewelData[index2] = jewel1
      setJewelData(newJewelData)
      console.log(newJewelData)
      return settwoJewelsIndex([])
    }
  }, [twoJewelsIndex])
  //handle check is fulfill 3 disappear condition
  useEffect(() => {
    let newJewelData = [...jewelData]
    let fulfilledJewels = []
    let emptyJewelsIdx = []
    jewelData.forEach((j, idx) => {
      if(j.type === 'empty') {
        emptyJewelsIdx = [...emptyJewelsIdx, idx]
      }
    })

    const checkIsFulfill = (index, jewelAddCount) => {
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
        fulfilledJewels = [...fulfilledJewels, ...checkFulfills]
        // console.log(fulfilledJewels)
        return true
      }
      return false
    }
    console.log(emptyJewelsIdx)
    if(emptyJewelsIdx.length > 0) {
      // let exchanged = false
      console.log(newJewelData)
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
          color: jewelColors[~~(Math.random() * 4)]
        }
        const newJewelsUpRow = [...jewelsUpRow, newJewel]
        console.log(emptyUpRowJewels, newJewelsUpRow)
        emptyUpRowJewels.forEach((jewelIdx, i) => {
          newJewelData[jewelIdx] = newJewelsUpRow[i]
        })
        // console.log(newJewelsUpRow)
        // if(upRowIdx < 0) {
        //   newJewelData[thisRowIdx] = {
        //     id: upRowIdx * 10,
        //     type: 'jewel',
        //     color: jewelColors[~~(Math.random() * 4)]
        //   }
        // }
      }
      setTimeout(() => {
        setJewelData(newJewelData)
      }, 500)
    } else {  
      for (let i = 0; i < jewelData.length; i++) {
        checkIsFulfill(i, jewelsPerRow)
        //row(expect last 2 jewels)
        if(i % 5 !== 3 && i % 5 !== 4) {
          checkIsFulfill(i, 1)
          // rowRes = checkIsFulfill(i, 1) 
        }
      }
    }
    //set fulfill jewels to empty
    if(fulfilledJewels.length > 0) {
      for (let i = 0; i < fulfilledJewels.length; i++) {
        const idx = fulfilledJewels[i];
        newJewelData[idx] = {
          ...jewelData[idx],
          type: 'empty',
          color: emptyColor,
        }
      }
      setJewelData(newJewelData)
    }
  }, [jewelData])
  return (
    <Box>
      {jewelData.map((data, index) => (
        <SingleJewel 
          key={ data.id }
          {...data} 
          isChosen={ twoJewelsIndex.find(idx => idx === index) }
          pos={ getJewelPos(index, jewelWidth) } 
          getIdFn={ () => { getJewelId(index) } } />
      ))}
    </Box>
  )
}

export default Jewels