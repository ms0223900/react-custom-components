import React from 'react'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: props => props.point1.top,
    left: props => props.point1.left,
    width: props => props.length - 3,
    height: 10,
    transformOrigin: 'center left',
    transform: props => `rotate(${props.deg}deg)`,
    // backgroundColor: '#f00',
    backgroundImage: `url(${'https://i7.pngguru.com/preview/124/707/617/thunder-desktop-wallpaper-clip-art-thunder-thumbnail.jpg'})`,
    backgroundSize: 'contain',
  }
})

const TwoPointSlash = ({ point1, point2 }) => {
  const topDiff = point2.top - point1.top
  const leftDiff = point2.left - point1.left
  const length = Math.sqrt(leftDiff * leftDiff + topDiff * topDiff)
  const deg = -Math.acos(leftDiff / length) / Math.PI * 180
  // console.log(deg)
  const classes = useStyles({ point1, point2, length, deg })
  return (
    <Box className={ classes.root } />
  )
}

export default TwoPointSlash