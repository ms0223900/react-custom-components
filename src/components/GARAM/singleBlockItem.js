import React from 'react'
import {
  cellSize, primaryColor,
} from './config'
import { Box, makeStyles } from '@material-ui/core';

export const basicBlockStyle = {
  display: 'inline-block',
  verticalAlign: 'top',
  width: cellSize,
  height: cellSize,
  margin: '-1px 0px 0px -1px',
  boxSizing: 'border-box',
  textAlign: 'center',
  border: '1px solid transparent',
  userSelect: 'none',
}

const useStyles = makeStyles({
  tableCell: {
    ...basicBlockStyle,
    border: props => props.isBlock ? '1px solid #aaa' : 'none',
    backgroundColor: props => props.isBlock ? '#fff' : 'transparent',
    fontSize: 32,
    fontWeight: 200,
    // userSelect: 'initial',
    '&:hover': {
      backgroundColor: 'rgba(100, 100, 100, 0.15)'
    }
  },
  tableInput: {
    display: 'inline-block',
    width: cellSize - 20,
    height: cellSize - 16,
    marginTop: 8,
    fontSize: 32,
    fontWeight: 300,
    textAlign: 'center',
    color: primaryColor,
    // backgroundColor: '#faf8eb',
    borderWidth: 0,
    cursor: 'pointer',
    outline: 'none',
  }
})

const SingleBlockItem = ({ index, type, number, isBlock, setBlankInput }) => {
  const classes = useStyles({ isBlock })
  return (
    <Box className={ classes.tableCell }>
      { type === 'blanked' ? (
        <input 
          onChange={ e => setBlankInput(e, index) }
          className={ classes.tableInput } 
          type={ 'text' } 
          value={ number } />
      ) : number }
      
    </Box>
  )
}

export default SingleBlockItem