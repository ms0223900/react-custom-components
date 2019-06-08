/* eslint-disable no-unused-vars */
import React from 'react'
import '../../styles/style.scss'
import { makeStyles } from '@material-ui/styles'
import SingleBlock, { useClickPos } from './singleBlock'

const shiftArr = (arr=[]) => {
  return [arr[arr.length - 1], ...arr.slice(0, -1)]
}

const sudokuArrDefault = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

const getShiftedSudoku = (sudokuArr) => {
  const res = []
  let shifed = sudokuArr
  for (let i = 0; i < 9; i++) {
    shifed = shiftArr(shifed)
    if( i % 3 === 0 && i > 0 ) {
      shifed = shifed.map(s => shiftArr(s))
    }
    res[i] = shifed
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





export default () => {
  const classes = useClass()
  const handledSudokuArr = getShiftedSudoku(sudokuArrDefault)
  const [pos, getPos] = useClickPos()
  return (
    <div style={{ padding: 6, }}>
      <h2>{ 'sudoku' }</h2>
      {handledSudokuArr.map((su, i) => (
        <div key={ i }>
          { su.map((s, j) => 
            s.map((ss, k) => 
              (<SingleBlock 
                key={ i * 100 + j * 10 + k } 
                getBlockPos={ getPos }
                blockPos={ [i, j, k] } 
                sudokuTxt={ ss } />))) 
          }
        </div>
      ))}
      <div style={{ left: pos[0], top: pos[1], }} className={ classes.popContainer }>{'hi....'}</div>
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

