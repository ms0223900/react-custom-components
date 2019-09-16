import React, { useState, useCallback, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Box, makeStyles } from '@material-ui/core'
import { FlashOn, Whatshot } from '@material-ui/icons'
import {
  jewelWidth,
  jewelsPerRow,
  emptyColor,
  jewelColors,
  delayTime,
  specialJewels,
  explodeImgSrc
} from './config'
import TwoPointSlash from './twoPointSlash'

const { bombColor, thunderColor } = specialJewels.colors
const { bombDestroyCount, thunderDestroyCount } = specialJewels.destroyCount

const amountOfJewels = jewelsPerRow * jewelsPerRow
const jewelIdxs = [...Array(amountOfJewels * 2).keys()]

const getJewel = (idx, feverMode='bomb', specificSpecial, feverRow) => { //if fever, it will be special jewels at same row
  if(specificSpecial && idx === specificSpecial) {
    return ({
      type: feverMode,
      color: specialJewels.colors[`${feverMode}Color`]
    })
  } else if(feverMode === 'bomb' && feverRow && idx >= feverRow * jewelsPerRow && idx < feverRow * (jewelsPerRow + 1) - 1) {
    return ({
      type: 'jewel',
      color: jewelColors[2]
    })
  } else if(feverMode === 'thunder') {
    return
  } else {
    return ({
      type: 'jewel',
      color: jewelColors[~~(Math.random() * jewelColors.length)]
    })
  }
  
}

const generateJewels = () => {
  // const randomRow = ~~(Math.random() * 5) + 5 //from 5 ~ 9
  return [...Array(amountOfJewels * 2).keys()]
    .map(idx => {
      const { type, color } = getJewel(idx, 'bomb', 80)
      return ({
        id: idx - amountOfJewels,
        type,
        color,
        hint: false,
        effect: null,
      })
    })
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
  const maxCompareAddCount = jewelAddCount === 1 ? (
    (~~(index / jewelsPerRow) + 1) * jewelsPerRow
  ) : (
    amountOfJewels * 2
  )
  const { type, color } = jewelData[index] //compared origin jewel
  let sameColorCount = 1
  let jewelIndex = index
  let checkFulfills = [{
    color,
    idx: jewelIndex
  }]
  let nextIndex = jewelIndex + jewelAddCount
  // console.log(jewelIndex + jewelAddCount)
  while(jewelData[nextIndex] && jewelData[nextIndex].color === color && type !== 'empty' && nextIndex < maxCompareAddCount) {
    sameColorCount += 1
    checkFulfills = [...checkFulfills, { color, idx: nextIndex }]
    nextIndex += jewelAddCount
  }
  if(sameColorCount >= 3) { //fulfill 3 
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

const getEmptyFn = data => {
  return data.type === 'empty'
}
const getIdxsByCondition = (data, conditionFn=getEmptyFn) => {
  let res = []
  data.forEach((data, idx) => {
    if(conditionFn(data) && idx >= amountOfJewels) {
      res = [...res, idx]
    }
  })
  return res
}

const mergeFulfillJewels = (jewels) => {
  const allIdxs = [...new Set( jewels.map(j => j.idx) )]
  const allColors = [...new Set( jewels.map(j => j.color) )]
  const jewelsByColors = allColors.map(color => {
    const sameColorJewel = jewels.filter(j => j.color === color)
    const idxs = [...new Set(sameColorJewel.map(j => j.idx))]
    return ({
      color,
      idxs,
      amount: idxs.length
    })
  })
  return ({
    jewelsByColors,
    allIdxs,
  })
}


const getSpecialJewelClearedJewels = (idxs, jewelData) => {
  const filteredData = jewelData.filter((data, i) => {
    return idxs.find(idx => idx === i) && data.type === 'jewel'
  })
  const allColors = [...new Set( filteredData.map(j => j.color) )]
  const jewelsByColors = allColors.map(color => {
    const sameColorJewels = filteredData.filter(j => j.color === color)
    return ({
      color,
      amount: sameColorJewels.length
    })
  })
  return jewelsByColors
}

//---


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
    lineHeight: `${ jewelWidth - 2 }px`,
    fontSize: '20px',
    transition: '0.3s',
    '& svg': {
      fontSize: '2.5em',
    },
    '& img': {
      width: '120%',
      height: '120%',
    }
  }
})

const SingleJewel = ({ jewelInfo, pos, isChosen, getIdFn }) => {
  // const { index, color, type, hint, effect } = jewelInfo
  const classes = useStyles({ ...jewelInfo, pos, isChosen })
  const Icon = ({ type, effect }) => {
    if(type === 'thunder') {
      return <FlashOn />
    } else if(type === 'bomb') {
      return <Whatshot />
    }
    if(effect && effect === 'explode') {
      return <img src={ explodeImgSrc } />
    }
    // return index
    return null
  }
  return (
    <Box onClick={ getIdFn } className={ classes.singleJewel }>
      <Icon {...jewelInfo} />
    </Box>
  )
}



const thunderIdxs_init = {
  center: 0,
  otherPoints: [] 
}

const Jewels = ({ 
  isPause, 
  hintMode=true,
  cancelHintFn,
  setScoreFn,
  setComboFn,
  setStepFn,
  setJewelsFn,
}, ref) => {
  const classes = useStyles()
  const [thunderIdxs, setThunderIdxs] = useState(thunderIdxs_init)
  const [jewelData, setJewelData] = useState(generateJewels())
  const [twoJewelsIndex, settwoJewelsIndex] = useState([])
  const getJewelId = useCallback((newIndex) => {
    const checkNotSame = !twoJewelsIndex.find(idx => idx === newIndex)
    //
    const checkHaveEmpty = jewelData.find(data => data.type === 'empty')
    if(newIndex >= amountOfJewels && !checkHaveEmpty && !isPause) {
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
      setStepFn && setStepFn(step => step + 1)
      setJewelData(newJewelData)
      // console.log(newJewelData)
      return settwoJewelsIndex([])
    }
  }, [twoJewelsIndex])
  //handle check is fulfill 3 disappear condition
  useEffect(() => {
    if(!isPause) {
      let newJewelData = [...jewelData]
      const emptyJewelsIdx = getIdxsByCondition(jewelData, (data) => {
        return data.type === 'empty'
      })
      //update empty jewels to new jewels
      if(emptyJewelsIdx.length > 0) {
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
        }, delayTime)
      } else {  //check have fulfill jewels
        
        let fulfilledJewels = []
        for (let i = amountOfJewels; i < jewelData.length; i++) { 
          //check column
          const columnFulfills = checkIsFulfill(i, jewelsPerRow, jewelData)
          fulfilledJewels = [...fulfilledJewels, ...columnFulfills]
          //check row(expect last 2 jewels)
          if(i % jewelsPerRow !== jewelsPerRow - 1 && i % jewelsPerRow !== jewelsPerRow - 2) {
            const rowFulfills = checkIsFulfill(i, 1, jewelData)
            fulfilledJewels = [...fulfilledJewels, ...rowFulfills]
          }
        }

        //merge color and remove duplicate
        fulfilledJewels = mergeFulfillJewels(fulfilledJewels)
        //set fulfill jewels to empty or special jewels
        const fulfilledJewelsCount = fulfilledJewels.allIdxs.length
        if(fulfilledJewelsCount > 0) {
          console.log('fulfilledJewels: ' + fulfilledJewels)
          //set infos...
          //set jewels fn
          setJewelsFn && setJewelsFn(fulfilledJewels.jewelsByColors)
          setComboFn && setComboFn(fulfilledJewelsCount)
          //
          for (let i = 0; i < fulfilledJewelsCount; i++) {
            const fulfilledIdx = fulfilledJewels.allIdxs[i]
            //trigger special jewels at same time, set to empty blocks
            //check is special jewels is around fulfilled jewels
            const dir4JewelsIndexes = jewelIdxs.filter(idx => {
              return checkJewelIs4Dir(fulfilledIdx, idx) && idx >= amountOfJewels
            })
            const bombJewelIdx = jewelData.findIndex((data, idx) => {
              return data.type === 'bomb' && dir4JewelsIndexes.find(index => index === idx)
            })
            const thunderJewelIdx = jewelData.findIndex((data, idx) => {
              return data.type === 'thunder' && dir4JewelsIndexes.find(index => index === idx)
            })
            // console.log('bombJewelIdx: ' + bombJewelIdx)
            if(bombJewelIdx !== -1) {
            //cross set jewel to empty
              const bombedJewelsIdxs = jewelIdxs.filter(idx => {
                const bombWhichRow = ~~(bombJewelIdx / jewelsPerRow)
                const checkColumn = idx >= amountOfJewels 
                  && (bombJewelIdx - idx) % jewelsPerRow === 0 
                  && idx >= bombJewelIdx - jewelsPerRow * bombDestroyCount
                  && idx <= bombJewelIdx + jewelsPerRow * bombDestroyCount
                const checkRow = idx >= amountOfJewels
                  && idx >= bombWhichRow * jewelsPerRow
                  && idx < (bombWhichRow + 1) * jewelsPerRow
                  && idx >= bombJewelIdx - 1 * bombDestroyCount
                  && idx <= bombJewelIdx + 1 * bombDestroyCount
                return checkColumn || checkRow
              })
              // console.log(bombedJewelsIdxs)
              const bombedJewels = getSpecialJewelClearedJewels(bombedJewelsIdxs, jewelData)
              // console.log('bombedJewels: ', bombedJewels)
              //set jewels fn
              setJewelsFn(bombedJewels)
              bombedJewelsIdxs.forEach(idx => {
                newJewelData[idx] = {
                  ...jewelData[idx],
                  type: 'empty',
                  color: emptyColor,
                  effect: 'explode',
                }
              })
            }
            //thunder
            if(thunderJewelIdx !== -1) {
            //destroy same color jewels, count depend on thunder jewels
              const { color: fulfilledJewelColor } = jewelData[fulfilledIdx]
              const sameColorJewelsIdxs = getIdxsByCondition(jewelData, (data) => {
                return data.color === fulfilledJewelColor
              })
              newJewelData[thunderJewelIdx] = {
                ...jewelData[thunderJewelIdx],
                type: 'empty',
                color: emptyColor,
              }
              //destroy same color jewels
              const thunderDestroyJewelsIdxs = sameColorJewelsIdxs.filter(idx => {
                return fulfilledJewels.allIdxs.find(fulIdx => fulIdx !== idx)
              }).slice(0, thunderDestroyCount)
              const thunderedJewels = getSpecialJewelClearedJewels(thunderDestroyJewelsIdxs, jewelData)
              // console.log('thunderedJewels: ', thunderedJewels)
              //set jewels fn
              setJewelsFn(thunderedJewels)
              thunderDestroyJewelsIdxs.forEach(idx => {
                newJewelData[idx] = {
                  ...jewelData[idx],
                  type: 'empty',
                  color: emptyColor,
                }
              })
              //set thunder effect, should minus amount of jewels
              const thunderPoints = {
                center: thunderJewelIdx - amountOfJewels,
                otherPoints: thunderDestroyJewelsIdxs.map(idx => idx - amountOfJewels)
              }
              console.log(thunderPoints)
              setThunderIdxs(thunderPoints)
            }
          
            //set empty jewels or bomb jewel
            newJewelData[fulfilledIdx] = {
              ...jewelData[fulfilledIdx],
              type: 'empty',
              color: emptyColor,
            }
            if(fulfilledJewelsCount >= 5 && i === fulfilledJewelsCount - 1) { //thunder jewel
              newJewelData[fulfilledIdx] = {
                ...jewelData[fulfilledIdx],
                type: 'thunder',
                color: thunderColor,
              }
            } else if(fulfilledJewelsCount === 4 && i === fulfilledJewelsCount - 1) { //bomb jewel
              newJewelData[fulfilledIdx] = {
                ...jewelData[fulfilledIdx],
                type: 'bomb',
                color: bombColor,
              }
            }
          }
          setScoreFn && setScoreFn(fulfilledJewelsCount)
          setJewelData(newJewelData)
        }
      }
    }
    if(jewelData.length === 0) {
      setJewelData(generateJewels())
    }
  }, [jewelData, isPause])
  useEffect(() => {
    let newJewelData = [...jewelData]
    if(hintMode) {
      for (let idx1 = amountOfJewels; idx1 < jewelData.length; idx1++) {
        let fulfilledJewels = []
        // const jewel = jewelData[i]
        const dir4JewelsIndexes = jewelIdxs.filter(idx => {
          return checkJewelIs4Dir(idx1, idx) && idx >= amountOfJewels
        })
        // console.log('index: ' + i + ', dir4JewelsIndexes: ' + dir4JewelsIndexes)

        //exchange 4 direction jewels to check is fulfill
        for (let j = 0; j < dir4JewelsIndexes.length; j++) {
          const idx2 = dir4JewelsIndexes[j]
          const exchangedData = exchangedJewels(idx1, idx2, jewelData)
          //check whether is fulfill
          for (let k = amountOfJewels; k < exchangedData.length; k++) {
            const columnFulfills = checkIsFulfill(k, jewelsPerRow, exchangedData)
            fulfilledJewels = [...fulfilledJewels, ...columnFulfills]
            //check row(expect last 2 jewels)
            if(k % jewelsPerRow !== jewelsPerRow - 1 && k % jewelsPerRow !== jewelsPerRow - 2) {
              const rowFulfills = checkIsFulfill(k, 1, exchangedData)
              fulfilledJewels = [...fulfilledJewels, ...rowFulfills]
            }
          }
        }
        console.log(fulfilledJewels)
        //merge color and remove duplicate
        fulfilledJewels = mergeFulfillJewels(fulfilledJewels)
        if(fulfilledJewels.allIdxs.length > 0) {
          // console.log('fulfilledJewels: ' + fulfilledJewels)
          fulfilledJewels.allIdxs.forEach(idx => {
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
  useEffect(() => {
    if(thunderIdxs.otherPoints.length > 0) {
      setTimeout(() => setThunderIdxs(thunderIdxs_init), delayTime)
    }
  }, [thunderIdxs])
  //
  useImperativeHandle(ref, () => ({
    handleNext: () => {
      setJewelData([])
      settwoJewelsIndex([])
    },
    handleResetGame: () => {
      setJewelData([])
      settwoJewelsIndex([])
    },
  }))
  const thunderPoints = getThunderPoints(thunderIdxs.center, thunderIdxs.otherPoints)
  return (
    <Box className={ classes.root }>
      <Box className={ classes.jewelContainer }>
        {jewelData.map((data, index) => (
          <SingleJewel 
            key={ data.id }
            jewelInfo={{
              ...data,
              index: index - amountOfJewels
            }}
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