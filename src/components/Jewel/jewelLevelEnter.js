import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography, Button } from '@material-ui/core'
import JewelsRequirePart from './jewelsRequirePart'

const getRequirementNameValue = (gameReqObj) => {
  const values = Object.values(gameReqObj)
  return Object.keys(gameReqObj).map((name, i) => ({
    name,
    value: values[i]
  }))
}

const JewelLevelEnter = ({ gameEnterInfo, cancelFn }) => {
  const {
    level,
    gameRequirements
  } = gameEnterInfo
  return (
    <Box>
      <Typography variant={ 'h4' }>
        {'Level ' + level}
      </Typography>
      {getRequirementNameValue(gameRequirements).map((req, i) => {
        const { name, value } = req
        if(name === 'requireJewels') {
          return (
            <JewelsRequirePart jewels={ value } />
          )
        }
        return (
          <Typography key={ i }>
            { `${ name } x ${ value }` }
          </Typography>
        )
      })}
      <Box>
        <Button>
          <Link
            to={ `/jewelGame/level/${ level }` }
          >
            { 'start' }
          </Link>
        </Button>
        <Button onClick={ cancelFn }>
          { 'cancel' }
        </Button>
      </Box>
      
    </Box>
  )
}

export default JewelLevelEnter