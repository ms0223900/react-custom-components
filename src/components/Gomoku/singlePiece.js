import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { cellSize } from './config'


const useStyles = makeStyles({
  root: {
    display: 'inline-block',
    width: cellSize - 4,
    height: cellSize - 4,
    margin: 2,
    // boxSizing: 'border-box',
    borderRadius: 10000,
    cursor: 'pointer',
    transition: '0.2s',
    backgroundColor: props => {
      if(props.blackOrWhite) {
        return props.blackOrWhite === 'black' ? 
          '#111' : '#fff'
      } else {
        return null
      }
    },
    boxShadow: props => props.blackOrWhite && '0px 0px 6px #aaa',
    '&:hover': {
      backgroundColor: props => !props.blackOrWhite && '#ddd',
      transition: '0.2s',
    }
  },
})

const SinglePiece = ({ id, setPiece, blackOrWhite }) => {
  const classes = useStyles({ blackOrWhite })
  return (
    <div
      onClick={ setPiece ? setPiece.bind(this, id) : null } 
      className={ classes.root } />
  )
}
export default SinglePiece