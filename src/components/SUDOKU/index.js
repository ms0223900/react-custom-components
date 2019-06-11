/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, {
  useCallback,
  useState,
  useEffect,
  useRef
} from 'react'
import { cloneDeep } from 'lodash'
import '../../styles/style.scss'
import { styleConfig } from './config'
import { makeStyles } from '@material-ui/styles'
import SingleBlock, { useClickPos } from './singleBlock'

const shiftArr = (arr=[]) => {
  return [arr[arr.length - 1], ...arr.slice(0, -1)]
}

const sudokuArrDefault = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
const arrIsEqual = (arr1, arr2) => (
  arr1.toString() === arr2.toString()
)

const getShiftedSudoku = (sudokuArr) => {
  const res = []
  let shifed = sudokuArr
  for (let i = 0; i < 9; i++) {
    shifed = shiftArr(shifed)
    if( i % 3 === 0 && i > 0 ) {
      shifed = shifed.map(s => shiftArr(s))
    }
    // const newShifted = _.cloneDeep(shifed)
    const newShifted = JSON.parse(JSON.stringify(shifed))
    res[i] = newShifted
  }
  return res
}

const convertNumberToSudoKuPos = (sudokuArr=[], number=0, newValue=null, arrNum=[9, 3, 3]) => {
  const i = ~~(number / arrNum[0])
  const j = ~~( (number % arrNum[0]) / arrNum[1] )
  const k = number % arrNum[0] % arrNum[2] - 1
  sudokuArr[i][j][k] = newValue
  return [i, j, k]
}
const convertPosToNum = (posArr=[]) => (
  posArr[0] * 9 + posArr[1] * 3 + posArr[2] + 1
)

const blankedPostion = [ 16, 31, 38, 60, 78, 80 ]


//generate blanked sudoku from origin sudoku array
const getBlankedSudoku = (sudokuArr) => {
  const newArr = _.cloneDeep(sudokuArr)
  blankedPostion.map(pos => convertNumberToSudoKuPos(newArr, pos, ''))
  return newArr
}


const useClass = makeStyles({
  popContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    boxShadow: '0px 2px 10px #111',
    cursor: 'pointer',
    width: '81px',
    // opacity: 0.6,
    '& span': {
      width: 27,
      display: 'inline-block',
      // padding: 4,
      textAlign: 'center', 
      userSelect: 'none',
      '&:hover': {
        backgroundColor: styleConfig.mainColor,
        color: '#fff',
      }
    }
  }
})



const useSetBlockNumber = (handledSudokuArr, blankedPostion) => {
  const [ sudokuArr, setSudokuNewArr ] = useState( handledSudokuArr )
  console.log(sudokuArr)
  const setBlockNumber = (number, blockPos) => {
    console.log(number, blockPos, blankedPostion, convertPosToNum(blockPos))
    if( !blankedPostion.includes(convertPosToNum(blockPos)) ) return 
    //deep clone
    let newArr = [...sudokuArr]
    let thatBlock = newArr[ blockPos[0] ][ blockPos[1] ][ blockPos[2] ]
    // check is the blank?
    // if(thatBlock !== '')  return 
    newArr[ blockPos[0] ][ blockPos[1] ][ blockPos[2] ] = number
    setSudokuNewArr(newArr)
  }
  return [sudokuArr, setBlockNumber]
}

const handledSudokuArr = getShiftedSudoku(sudokuArrDefault)
const initBlankedSudoku = getBlankedSudoku(handledSudokuArr)
//
export default () => {
  const classes = useClass()
  const containerTop = useRef(0)
  const popUpDisplay = useRef(false)
  const REF = useRef()
  //
  const [pos, getPos] = useClickPos()
  const [ sudokuArr, setBlockNumber ] = useSetBlockNumber(initBlankedSudoku, blankedPostion)
  console.log(sudokuArr)

  const getContainer = (el) => {
    containerTop.current = el && el.getBoundingClientRect().top
    // console.log(containerTop.current)
    // containerTop.current = el.offsetTop + window.scrollY
  }
  useEffect(() => {
    console.log(handledSudokuArr)
    if(handledSudokuArr.toString() === sudokuArr.toString()) {
      window.alert('win~')
    }
  }, [ sudokuArr ])


  return (
    <div ref={ getContainer } style={{ position: 'relative', padding: 6, }}>
      <h2>{ 'sudoku' }</h2>
      {sudokuArr.map((su, i) => (
        <div key={ i }>
          { su.map((s, j) => 
            s.map((ss, k) => 
              (<SingleBlock 
                key={ i * 9 + j * 3 + k }
                isPosNow={ pos[2] && arrIsEqual([i, j, k], pos[2]) } 
                getBlockPos={ getPos }
                blockPos={ [i, j, k] } 
                sudokuTxt={ ss } />))) 
          }
        </div>
      ))}
      <SelectNumberPop 
        left={ pos[0] }
        top={ pos[1] }
        className={ classes.popContainer }
        blockPos={ pos[2] }
        setBlockNum={ setBlockNumber }  />
    </div>
  )
}

const SelectNumberPop = ({ left, top, className, setBlockNum, blockPos }) => {
  return (
    <div 
      style={{ left, top, }} 
      className={ className }>
      { [...Array(9).keys()].map(k => k + 1).map(key => (
        <span 
          key={ key } 
          onClick={ setBlockNum.bind(this, key, blockPos) }>
          { key }
        </span>
      )) }
    </div>
  )
}


