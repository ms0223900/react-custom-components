/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, {
  useCallback,
  useState,
  useEffect,
  useRef
} from 'react'
import _ from 'lodash'
import '../../styles/style.scss'
import { styleConfig } from './config'
import { makeStyles } from '@material-ui/styles'
import SingleBlock, { useClickPos } from './singleBlock'

const shiftArr = (arr=[]) => {
  return [arr[arr.length - 1], ...arr.slice(0, -1)]
}

const from1To9 = [...Array(9).keys()].map(a => ({
  number: a + 1,
  type: 'normal',
})) //1~9
const sliceArr = (arr) => (
  [arr.slice(0, 3), arr.slice(3, 6), arr.slice(6, 9)]
)

const sudokuArrDefault = sliceArr(_.shuffle(from1To9)) 
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
    const newShifted = _.cloneDeep(shifed)
    res[i] = newShifted
  }
  return res
}

const convertNumberToSudoKuPos = (sudokuArr=[], number=0, newValue=null, arrNum=[9, 3, 3]) => {
  const i = ~~((number - 1) / arrNum[0])
  const j = ~~( (number - 1) % arrNum[0] / arrNum[1] )
  const k = (number - 1) % arrNum[0] % arrNum[1] 
  // console.log([i, j, k])
  // sudokuArr[i][j][k].name = newValue
  sudokuArr[i][j][k] = {
    number: newValue,
    type: 'blank'
  }
  return [i, j, k]
}
const convertPosToNum = (posArr=[]) => (
  posArr[0] * 9 + posArr[1] * 3 + posArr[2] + 1
)

//generate random blanked position in sudoku
const randomBlankedPostion = _.sampleSize([...Array(80).keys()].map(a => a + 1), 1)
console.log(randomBlankedPostion)
// const blankedPostion = [ 16, 31, 38, 60, 78, 80 ]




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
    // check is the blank?
    if( !blankedPostion.includes(convertPosToNum(blockPos)) ) return 
    //deep clone
    let newArr = [...sudokuArr]
    let thatBlock = newArr[ blockPos[0] ][ blockPos[1] ][ blockPos[2] ]
    
    newArr[ blockPos[0] ][ blockPos[1] ][ blockPos[2] ].number = number
    setSudokuNewArr(newArr)
  }
  return [sudokuArr, setBlockNumber]
}

//generate blanked sudoku from origin sudoku array
const getBlankedSudoku = (sudokuArr, blankedPostion) => {
  const newArr = _.cloneDeep(sudokuArr)
  blankedPostion.map(pos => convertNumberToSudoKuPos(newArr, pos, ''))
  return newArr
}


const handledSudokuArr = getShiftedSudoku(sudokuArrDefault)
const initBlankedSudoku = getBlankedSudoku(handledSudokuArr, randomBlankedPostion)

const checkSudokuIsSame = (answerArr, yourArr) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        if(answerArr[i][j][k].number !== yourArr[i][j][k].number) {
          return false
        }
      }
    }
  } return true
}



//
export default () => {
  const classes = useClass()
  const containerTop = useRef(0)
  const popUpDisplay = useRef(false)
  const blankedPosition = useRef(randomBlankedPostion)
  //
  const [pos, getPos] = useClickPos()
  const [ sudokuArr, setBlockNumber ] = useSetBlockNumber(initBlankedSudoku, randomBlankedPostion)

  const getContainer = (el) => {
    containerTop.current = el && el.getBoundingClientRect().top
    // console.log(containerTop.current)
    // containerTop.current = el.offsetTop + window.scrollY
  }
  useEffect(() => {
    console.log(initBlankedSudoku)
    // console.log(JSON.stringify(handledSudokuArr),'////', JSON.stringify(sudokuArr))
    if(checkSudokuIsSame(handledSudokuArr, sudokuArr)) {
      window.alert('win~')
    }
  }, [ sudokuArr ])

  console.log(sudokuArr)
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
                isBlanked={ ss.type === 'blank' }
                blockPos={ [i, j, k] } 
                sudokuTxt={ ss.number } />))) 
          }
        </div>
      ))}
      <SelectNumberPop 
        left={ pos[0] }
        top={ pos[1] }
        className={ classes.popContainer }
        blockPos={ pos[2] }
        setBlockNum={ setBlockNumber } />
    </div>
  )
}

export const SudokuPanel = () => {

}




const SelectNumberPop = ({ left, top, className, setBlockNum, blockPos }) => {
  return (
    <div 
      style={{ left, top, }} 
      className={ className }>
      { from1To9.map(key => (
        <span 
          key={ key.number } 
          onClick={ setBlockNum.bind(this, key.number, blockPos) }>
          { key.number }
        </span>
      )) }
    </div>
  )
}


