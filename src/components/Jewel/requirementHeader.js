import React from 'react'
import { Box, Typography } from '@material-ui/core'

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
          <>
            {jewels.map(jewel => (
              <Typography>{ 'jewel x ' + jewel }</Typography>
            ))}
          </>
        )}
        {time && (
          <Typography>{ 'time: ' + time }</Typography>
        )}
      </Box>
    </Box>
  )
}

export default RequirementHeader