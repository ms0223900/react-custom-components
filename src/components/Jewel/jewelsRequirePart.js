import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography, Button, makeStyles } from '@material-ui/core'

const requireJewelWidth = 24

const useStyles = makeStyles({
  jewelPartContainer: {
    margin: 6,
  },
  jewelPartSingleJewel: {
    width: requireJewelWidth,
    height: requireJewelWidth,
    borderRadius: 3,
    margin: 3,
    backgroundColor: props => props.color,
  },
})

const SingleReqJewel = ({ color }) => {
  const classes = useStyles({ color })
  return (
    <Box className={ classes.jewelPartSingleJewel } />
  )
}

const JewelsRequirePart = ({ jewels }) => {
  const classes = useStyles()
  return (
    <Box>
      {jewels.map((jewel, i) => {
        const { color, amount } = jewel
        return (
          <Box 
            key={ i } 
            className={ classes.jewelPartContainer }
            display={ 'inline-flex' }
            alignItems={ 'center' }
          >
            <SingleReqJewel color={ color } />
            <Typography>
              { ` x ${ amount }` }
            </Typography>
          </Box>
        )
      })}
    </Box>
  )
}

export default JewelsRequirePart