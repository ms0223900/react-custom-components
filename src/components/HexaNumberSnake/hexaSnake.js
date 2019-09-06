import React from 'react'
import { Box, Container } from '@material-ui/core';
import { 
  useStyles_singleHexItem,
  useStyles_hexSnake 
} from './style'
import './style.scss'

const numbers_mockData = [...Array(1 + 6 + 12 + 18).keys()]

const getPosition = (width, index) => {
  let deg = 0
  let radius = width
  const getLeftTop = (radius, deg) => ({
    left: radius * Math.cos(deg * Math.PI / 180),
    top: radius * Math.sin(deg * Math.PI / 180),
  })
  if(index <= 6) { //1 ~ 6
    deg = index * (360 / 6)
  } else if(index > 6 && index <= 18) {
    deg = (index - 6) * (360 / 12)
    radius = index % 2 === 0 ? width * 2 : width * Math.sqrt(3)
  } else if(index > 18 && index <= 36) {
    deg = (index - 18) * (360 / 18)
    radius = index % 3 === 0 ? width * 3 : width * Math.sqrt(7)
  } else if(index > 36 && index <= 60) {
    deg = (index - 36) * (360 / 24)
    radius = index % 4 === 0 ? width * 4 : 
      (index % 4 === 1 || index % 4 === 3) ? width * Math.sqrt(13) : 
      width * Math.sqrt(12)
  }
  return getLeftTop(radius, deg)
}

export const SingleHexItem = ({ index=1, number, }) => {
  const position = getPosition(60 + 2, index)
  const classes = useStyles_singleHexItem({ index, position })
  return (
    <Box className={ 'hexagon' + ' ' + classes.root }>
      {number}
    </Box>
  )
}

export const HexSnake = ({ numbers=numbers_mockData }) => {
  const classes = useStyles_hexSnake()
  return (
    <Container className={ classes.root }>
      {numbers.map((num, i) => (
        <SingleHexItem 
          key={ num }
          index={ i }
          number={ num }  />
      ))}
    </Container>
  )
}

// export default SingleHexItem