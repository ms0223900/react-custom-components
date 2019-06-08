/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  sudoku: {
    display: 'inline-block',
    padding: 5,
    border: '1px solid #aaa',
    userSelect: 'none',
    '&:hover, &.active': {
      cursor: 'pointer',
      backgroundColor: '#a0a',
      color: '#fff',
    }
  }
})

export const useClickPos = () => {
  const [pos, setPos] = useState([0, 0])
  const getPos = (e, blockPos, txt) => {
    console.log(e.clientX, e.clientY, blockPos, txt)
    setPos([e.clientX, e.clientY, blockPos])
  }
  return [pos, getPos]
}


export default ({ sudokuTxt, blockPos, isPosNow=false, getBlockPos }) => {
  const classes = useStyles()
  
  return (
    <span 
      onClick={ e => getBlockPos(e, blockPos, sudokuTxt) } 
      className={ isPosNow ? classes['sudoku'] + ' active' : classes['sudoku'] }>
      { sudokuTxt }
    </span>
  )
}