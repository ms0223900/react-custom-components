/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, {
  useCallback,
  useState,
  useEffect
} from 'react'
import { cloneDeep } from 'Lodash'
import '../../styles/style.scss'
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

const useClass = makeStyles({
  popContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    boxShadow: '0px 2px 10px #111',
  }
})



const useSetBlockNumber = (handledSudokuArr) => {
  const [ sudokuArr, setSudokuNewArr ] = useState( handledSudokuArr )
  console.log(sudokuArr)
  const setBlockNumber = (number, blockPos) => {
    console.log(number, blockPos)
    //deep clone
    let newArr = [...sudokuArr]
    newArr[ blockPos[0] ][ blockPos[1] ][ blockPos[2] ] = number
    setSudokuNewArr(newArr)
  }
  return [sudokuArr, setBlockNumber]
}

const handledSudokuArr = getShiftedSudoku(sudokuArrDefault)

export default () => {
  const classes = useClass()
  const [pos, getPos] = useClickPos()
  const [ sudokuArr, setBlockNumber ] = useSetBlockNumber(handledSudokuArr)
  console.log(sudokuArr)

  useEffect(() => {
    console.log('hi')
  }, [ sudokuArr ])


  return (
    <div style={{ padding: 6, }}>
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
          style={{ padding: 4, userSelect: 'none', }} 
          onClick={ setBlockNum.bind(this, key, blockPos) }>
          { key }
        </span>
      )) }
    </div>
  )
}





//here
const mockData = [
  [
    { id: 0, title: 'a', },
    { id: 1, title: 'b', }
  ],
  [
    { id: 2, title: 'c', },
    { id: 3, title: 'd', }
  ],
]

const RowData = ({ data }) => {
  return (
    <div className={ '' }>
      { data.map(d => (
        <div>
          {d.map(insideD => (
            <div>{ insideD.id + ': ' + insideD.title }</div>
          ))}
        <hr />
        </div>
      )) }
    </div>
  )
}
//here

