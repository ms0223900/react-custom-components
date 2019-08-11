import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { cellSize } from './config'

const tableCells = [...Array(225).keys()]

const useStyles = makeStyles({
  root: {
    position: 'relative',
    width: cellSize * 15,
    margin: 'auto',
    fontSize: 0,
  },
  tableCell: {
    display: 'inline-block',
    width: cellSize,
    height: cellSize,
    boxSizing: 'border-box',
    border: '1px solid #aaa',
  }
})

const Table = (props) => {
  const classes = useStyles()
  return (
    <div className={ classes.root }>
      {tableCells.map(cell => (
        <div 
          key={ cell } 
          className={ classes.tableCell }></div>
      ))}
      {props.children}
    </div>
  )
}
export default Table