import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { cellSize } from './config'
import SinglePiece from './singlePiece'

// const tableCells = [...Array(14 * 14).keys()]

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    width: cellSize * 14,
    margin: 'auto',
    fontSize: 0,
    transform: `translate(${ cellSize / 2 }px, ${ cellSize / 2 }px)`
  },
})

const Pieces = ({ pieceData, setPiece }) => {
  const classes = useStyles()
  return (
    <div className={ classes.root }>
      {pieceData.map(piece => (
        <SinglePiece 
          key={ piece.pieceId }
          id={ piece.pieceId }
          setPiece={ setPiece }
          blackOrWhite={ piece.pieceColor } />
      ))}
    </div>
  )
}
export default Pieces