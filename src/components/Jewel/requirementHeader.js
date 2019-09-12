import React from 'react'
import { Box, Typography } from '@material-ui/core'
import JewelsRequirePart from './jewelsRequirePart'

const RequirementHeader = ({ gameRequirements }) => {
  const { score, jewels, time } = gameRequirements
  return (
    <Box>
      <Typography>
        { 'remain requirements' }
      </Typography>
      <Box>
        {score && (
          <Typography>{ 'score: ' + score }</Typography>
        )}
        {jewels && (
          <JewelsRequirePart 
            jewels={ jewels } />
        )}
        {time && (
          <Typography>{ 'time: ' + time }</Typography>
        )}
      </Box>
    </Box>
  )
}

export default RequirementHeader