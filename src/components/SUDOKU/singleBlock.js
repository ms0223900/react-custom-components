/* eslint-disable no-unused-vars */
import React, { useCallback, useState, useRef } from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = (blockPos) => makeStyles({
  sudoku: {
    display: 'inline-block',
    verticalAlign: 'top',
    width: 36,
    height: 34,
    padding: 5,
    boxSizing: 'border-box',
    textAlign: 'center',
    border: '1px solid #aaa',
    userSelect: 'none',
    borderBottomWidth: (blockPos[0]) % 3 === 2 ? '3px' : '1px',
    '&:nth-child(3n)': {
      borderRightWidth: '3px',
      
    },
    '&:hover, &.active': {
      cursor: 'pointer',
      backgroundColor: '#a0a',
      color: '#fff',
    }
  }
})

export const useClickPos = () => {
  const [pos, setPos] = useState([-10000, 0])
  const getPos = (e, blockPos, txt) => {
    const outsideContainerTop = e.target.parentNode.parentNode.getBoundingClientRect().top
    console.log(outsideContainerTop, e.clientX + 10, e.clientY, blockPos, txt)
    setPos([36 * 9 + 10, e.clientY - outsideContainerTop - 40, blockPos])
  }
  return [pos, getPos, setPos]
}


export default ({ sudokuTxt, blockPos, isPosNow=false, getBlockPos, getBlockRef }) => {
  const classes = useStyles(blockPos)()
  // console.log(blockPos[0])

  return (
    <span 
      ref={ getBlockRef }
      onClick={ e => getBlockPos(e, blockPos, sudokuTxt) } 
      className={ isPosNow ? classes['sudoku'] + ' active' : classes['sudoku'] }>
      { sudokuTxt }
    </span>
  )
}