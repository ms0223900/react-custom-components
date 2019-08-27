import React from 'react'
import {
  cellSize,
} from './config'
import { Box, makeStyles } from '@material-ui/core';
import { basicBlockStyle } from './singleBlockItem';

const useStyles = makeStyles({
  operationBlock: {
    ...basicBlockStyle,
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 900,
    lineHeight: `${ cellSize - 4 }px`,
    
  }
})

const SingleOperationItem = ({ operation }) => {
  const classes = useStyles()
  return (
    <Box className={ classes.operationBlock }>
      { operation }
    </Box>
  )
}

export default SingleOperationItem

