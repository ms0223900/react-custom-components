import React from 'react'
import { Box, Typography } from '@material-ui/core';
import { StarPart } from './multiLevels'

const ResultContent = ({ content={} }) => {
  const { level, score, star } = content
  //
  return (
    <Box>
      <Typography variant={'h4'}>{ '--Result--' }</Typography>
      <Typography variant={'subtitle1'}>{ 'clear level: ' + level }</Typography>
      <Typography variant={'subtitle1'}>{ 'score: ' + score }</Typography>
      {star && (
        <StarPart star={ star } />
      )}
    </Box>
  )
}

export default ResultContent