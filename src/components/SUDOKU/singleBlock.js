/* eslint-disable no-unused-vars */
import React, { useCallback, useState, useRef } from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  sudoku: {
    display: 'inline-block',
    minWidth: 20,
    padding: 5,
    textAlign: 'center',
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
    const outsideContainerTop = e.target.parentNode.parentNode.getBoundingClientRect().top
    console.log(outsideContainerTop, e.clientX + 10, e.clientY, blockPos, txt)
    setPos([e.clientX + 10, e.clientY - outsideContainerTop, blockPos])
  }
  return [pos, getPos, setPos]
}


export default ({ sudokuTxt, blockPos, isPosNow=false, getBlockPos, getBlockRef }) => {
  const classes = useStyles()
  

  return (
    <span 
      ref={ getBlockRef }
      onClick={ e => getBlockPos(e, blockPos, sudokuTxt) } 
      className={ isPosNow ? classes['sudoku'] + ' active' : classes['sudoku'] }>
      { sudokuTxt }
    </span>
  )
}