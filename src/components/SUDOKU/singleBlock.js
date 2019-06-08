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
  const getPos = (e, blockPos) => {
    console.log(e.clientX, e.clientY, blockPos)
    setPos([e.clientX, e.clientY])
  }
  return [pos, getPos]
}


export default ({ sudokuTxt, blockPos, isChosen=false, getBlockPos }) => {
  const classes = useStyles()
  
  return (
    <span 
      onClick={ e => getBlockPos(e, blockPos) } 
      className={ isChosen ? classes['sudoku'] + ' active' : classes['sudoku'] }>
      { sudokuTxt }
    </span>
  )
}