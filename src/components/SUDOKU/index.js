import React from 'react'

const shiftArr = (arr=[]) => {
  return [arr[arr.length - 1], ...arr.slice(0, -1)]
}

const sudokuArrDefault = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
// const sudokuArr_type2 = sudokuArrDefault.map(arr => shiftArr(arr))
// const sudokuArr_type3 = sudokuArr_type2.map(arr => shiftArr(arr))

const getShiftedSudoku = (sudokuArr) => {
  const res = []
  let shifed = sudokuArr
  // let insideShifed = []
  // let k = 0
  // for (let i = 0; i < sudokuArr.length; i++) {
  //   shifed = shiftArr(shifed)
  //   insideShifed = shiftArr(shifed)
  //   for (let j = 0; j < shifed.length; j++) {
  //     res[k] = insideShifed.map(s => shiftArr(s))
  //     insideShifed = insideShifed.map(s => shiftArr(s))
  //     k += 1
  //   }
  // }
  for (let i = 0; i < 9; i++) {
    shifed = shiftArr(shifed)
    if( i % 3 === 0 && i > 0 ) {
      shifed = shifed.map(s => shiftArr(s))
    }
    res[i] = shifed
  }
  return res
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
    <div>
      {data.map(d => (
        <div>
          {d.map(insideD => (
            <div>{ insideD.id + ': ' + insideD.title }</div>
          ))}
        </div>
      ))}
    </div>
  )
}
//here

export default () => {
  const handledSudokuArr = getShiftedSudoku(sudokuArrDefault)
  return (
    <div style={{ padding: 6, }}>
      <h2>{ 'sudoku' }</h2>
      {handledSudokuArr.map(su => (
        <div style={{ letterSpacing: '4px' }}>{ su }</div>
      ))}
      <RowData data={ mockData } />
    </div>
  )
}
