import React, { useState } from 'react'
import {
  cellSize,
  allPosibleTwoDigitsNumbers,
  getRandomNumberAndGetRandomFac,
} from './config'
import { Box, makeStyles } from '@material-ui/core';



const nums = allPosibleTwoDigitsNumbers()
console.log(getRandomNumberAndGetRandomFac(nums))

const useStyles = makeStyles({
  root: {
    position: 'relative',
    width: cellSize * 7,
    margin: '30px auto',
    fontSize: 0,
  },
  tableCell: {
    display: 'inline-block',
    width: cellSize,
    height: cellSize,
    margin: '-1px 0px 0px -1px',
    boxSizing: 'border-box',
    border: '1px solid #aaa',
  }
})




const GARAM = () => {
  const classes = useStyles()
  const [randomTwoDigitNums] = useState(getRandomNumberAndGetRandomFac(nums))
  const space63 = [...Array(7 * 9).keys()]
  return (
    <Box className={ classes.root }>
      {space63.map(sp => (
        <div key={ sp } className={ classes.tableCell }>

        </div>
      ))}
    </Box>
  )
}

export default GARAM

