import React, { useRef, useState, useCallback, forwardRef, useImperativeHandle, useEffect } from 'react'
import { Box, makeStyles } from '@material-ui/core'

const jewelWidth = 50
const jewelsPerRow = 5


// const jewelsData_init = [
//   { id: 0, color: '#f00', },
//   { id: 1, color: '#00f', },
//   { id: 2, color: '#0fa', },
//   { id: 3, color: '#f00', },
//   { id: 4, color: '#00f', },
//   { id: 5, color: '#0fa', },
// ]

const jewelsData_init = [
  { id: 0, color: '#0fafad', },
  { id: 1, color: '#0fafad', },
  { id: 2, color: '#f00', },
  { id: 3, color: '#0fafad', },
  { id: 4, color: '#00f', },
  { id: 5, color: '#0fa', },
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
    width: jewelWidth, 
    height: jewelWidth,
    borderRadius: 10,
    boxSizing: 'border-box',
    // transform: props => `translate(${props.pos.left}px, ${props.pos.top}px)`,
    transition: '0.3s'
  }
})

const SingleJewel = ({ pos, color, getIdFn }) => {
  const classes = useStyles({ color, pos })
  return (
    <Box onClick={ getIdFn } className={ classes.singleJewel }></Box>
  )
}

const Jewels = () => {
  const [jewelData, setJewelData] = useState(jewelsData_init)
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
    const checkIsFulfill = (index, jewelAddCount) => {
      let sameColorCount = 1
      let jewelIndex = index
      let nextIndex = jewelIndex + jewelAddCount
      const { color } = jewelData[index]
      console.log(jewelIndex + jewelAddCount)
      while(jewelData[nextIndex] && jewelData[nextIndex].color === color) {
        sameColorCount += 1
        nextIndex += jewelAddCount
        console.log('hi')
      }
      if(sameColorCount > 2) {
        window.alert('yes!')
        return true
      }
      return false
    }
    for (let i = 0; i < jewelData.length; i++) {
      const columnRes = checkIsFulfill(i, jewelsPerRow)
      //row(expect last 2 jewels)
      let rowRes
      if(i % 5 !== 3 && i % 5 !== 4) {
        rowRes = checkIsFulfill(i, 1) 
      }
      if(columnRes || rowRes) {
        break
      }
    }
  }, [jewelData])
  return (
    <Box>
      {jewelData.map((data, index) => (
        <SingleJewel 
          key={ data.id }
          {...data} 
          pos={ getJewelPos(index, jewelWidth) } 
          getIdFn={ () => { getJewelId(index) } } />
      ))}
    </Box>
  )
}

export default Jewels